from datetime import datetime
import requests
from bs4 import BeautifulSoup
import re
import os
from datetime import date
import configparser
import logging
import sys

#ログの設定
logger = logging.getLogger("logger")    #logger名loggerを取得
logger.setLevel(logging.DEBUG)  #loggerとしてはDEBUGで

#handler_command_lineを作成
handler_command_line = logging.StreamHandler()
handler_command_line.setFormatter(logging.Formatter("%(levelname)8s %(message)s"))

#handler_docker_containerを作成
handler_docker_container = logging.FileHandler(filename="/proc/1/fd/1")  #handler2はdocker logが使うPID=1のstdoutファイルへ出力
handler_docker_container.setFormatter(logging.Formatter("%(levelname)8s %(message)s"))

#loggerに2つのハンドラを設定
logger.addHandler(handler_command_line)
logger.addHandler(handler_docker_container)


config_file = os.environ.get('CONFIG_FILE')
if config_file is None:
    logger.error("設定ファイルが指定されていません")
    sys.exit(1)

# configparserの宣言とiniファイルの読み込み
config_ini = configparser.ConfigParser()
config_ini.read(config_file, encoding='utf-8')

#server
django_server_ip= config_ini['SERVER']['django_server_ip']
#API
web_api_url = django_server_ip + config_ini['SERVER']['web_api_url']
#jpcanada_home_url
jpcanada_home_url = config_ini['JP_CANADA']['jpcanada_home_url']
#スタートリンクの設定
link_url = config_ini['JP_CANADA']['link_url']
#スクリプトの実行時から何日前までのデータを取得するのかの設定
# days_prior = int(config_ini['JP_CANADA']['days_prior'])

price_list = {
    # 'bbs205.png' : 399,
    'bbs206.png' : 400,
    'bbs207.png' : 500,
    'bbs208.png' : 600,
    'bbs209.png' : 700,
    'bbs210.png' : 800,
    'bbs211.png' : 900,
    'bbs212.png' : 1200,
    }

def data_insert(item_data,files):

    try:
        response = requests.post(web_api_url, data=item_data,files=files)
    except requests.RequestException as e:
        logger.error(f"Request failed: {e}")

def transfer_date_text2datetime(pub_date_text):
        
        pattern = r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
        pub_date_string = re.findall(pattern, pub_date_text)[-1]

        return datetime.strptime(pub_date_string, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%dT%H:%M:%SZ')

def jpcanada_html_parser(load_url):

    # Webページを取得して解析する
    response = requests.get(load_url)
    response.encoding = 'euc-jp' 
    soup = BeautifulSoup(response.text, 'html.parser')

    structurs = soup.find_all(class_='topic')
    # 必要なデータの抽出
    for elements in structurs:   

        #投稿日の取得
        pub_date_text = elements.find(class_='post-detail').find('span').get_text()
        pub_date = transfer_date_text2datetime(pub_date_text)
        #投稿タイトルの取得
        name = elements.find(class_='divTableCell col2').find("h2").string
        #家賃価格の取得
        price_img_key = elements.find(class_='divTableCell col1').find("img")['src'].split('/')[-1]
        if price_img_key in price_list:
            price = price_list[price_img_key]
        else:
            continue
        #物件画像の取得(複数)
        try:

            files = []
            img_urls = elements.find_all(class_='imgfit_m')
            for img_url_src in img_urls:
                img_url = img_url_src.get('src')
                img_full_url = jpcanada_home_url + img_url
                img_name = img_url.split('/')[-1]
                img_data_file = requests.get(img_full_url).content
                files.append(('images', (img_name, img_data_file, 'image/jpeg')))
                
        except Exception as e:
            logger.warning(f"An unexpected error occurred: {e}")
            continue
        #アドレス情報の取得
        address = ''
        #物件詳細情報の取得(電話番号　Or Emailアドレスが記載されているデータを取得)
        description = elements.find(class_="topic-content").contents[-6].get_text()  
        email_pattern = r'\b\d{2,4}[-(]?\d{2,4}[-)]?\d{3,4}\b'
        emails  = re.findall(email_pattern, description)

        phone_pattern = r'\b\d{2,4}[-(]?\d{2,4}[-)]?\d{3,4}\b'
        phone_numbers = re.findall(phone_pattern, description)

        if not emails or not phone_numbers:
            continue
        #参照元
        reference = "JPCanada"

        #APIを使用して取得情報をPOST
        logger.info("data inserting")
        item_data = {
            'pub_date': pub_date,
            'name': name,
            'price': price,
            'address': address,
            'description' :description,
            'reference' : reference,
        } 
        data_insert(item_data,files)  




if __name__ == "__main__":

    current_datetime = datetime.now()
    logger.info("process start time:{}".format(current_datetime))
    logger.info("scraping link: {} ".format(link_url))
    jpcanada_html_parser(link_url)

    while True:
        response = requests.get(link_url)
        response.encoding = 'euc-jp' 
        soup = BeautifulSoup(response.text, 'html.parser')

        section = soup.find('section', class_='bbs-function')  # 'bbs-function'クラスを持つsection要素を取得
        link = section.find_all('a')[-1]  # そのsection内の全てのa要素を取得
        
        if '新しい5件を表示' in link.text:  # a要素のテキストに"新しい5件を表示"が含まれているかチェック
            link_url = link['href']  # リンクのURLを取得
            logger.info("scraping link: {} ".format(link_url))
            jpcanada_html_parser(link_url)
        else:
            # config_ini.set('JP_CANADA', 'link_url', link_url)  # セクションとキーを指定し、新しい値を設定
            # # 設定ファイルへの変更の書き込み
            # with open(config_file, 'w') as configfile:
            #     config_ini.write(configfile)
            break