from datetime import datetime
import requests
from bs4 import BeautifulSoup
import re


django_server_ip = "http://172.30.0.3:8000"
#API
web_api_url= django_server_ip + '/property/propertiesInfo/'
#jpcanada_home_url
jpcanada_home_url = 'http://bbs.jpcanada.com'
#スタートリンクの設定
link_url = "http://bbs.jpcanada.com/topics.php?bbs=3&msgid=175656&order=0&cat=&icon=" 

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

def data_insert(pub_date,name,price,img_data_file,img_name,address):

    files = {'imags': (img_name, img_data_file, 'image/jpeg')}
    item_data = {
        'pub_date': pub_date,
        'name': name,
        'price': price,
        'address': address
    }
    try:
        response = requests.post(web_api_url, data=item_data,files=files)
    except requests.RequestException as e:
        print(f"Request failed: {e}")

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
        #物件画像の取得(一枚)
        try:
            img_url = elements.find_all(class_='imgfit_m')[0].get('src')
            img_full_url = jpcanada_home_url + img_url
            img_name = img_url.split('/')[-1]
            img_data_file = requests.get(img_full_url).content
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            continue
        #アドレス情報の取得
        address = ''

        #APIを使用して取得情報をPOST
        print("data inserting")
        data_insert(pub_date,name,price,img_data_file,img_name,address)  



if __name__ == "__main__":
    
    while True:
        response = requests.get(link_url)
        response.encoding = 'euc-jp' 
        soup = BeautifulSoup(response.text, 'html.parser')

        section = soup.find('section', class_='bbs-function')  # 'bbs-function'クラスを持つsection要素を取得
        link = section.find_all('a')[-1]  # そのsection内の全てのa要素を取得
        
        if '新しい5件を表示' in link.text:  # a要素のテキストに"新しい5件を表示"が含まれているかチェック
            link_url = link['href']  # リンクのURLを取得
            print(link_url)
            jpcanada_html_parser(link_url)
        else:
            break