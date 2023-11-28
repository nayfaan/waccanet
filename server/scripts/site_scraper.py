from datetime import datetime
import requests
from bs4 import BeautifulSoup
import re

web_api_url = "http://172.30.0.3:8000/property/propertiesGetAll/"

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

def data_insert(pub_date,name,price,address):
    item_data = {
        'pub_date': pub_date,
        'name': name,
        'price': price,
        'address': address
    }

    try:
        response = requests.post(web_api_url, data=item_data)
    except requests.RequestException as e:
        print(f"Request failed: {e}")


def jpcanada_html_parser(load_url):

    # Webページを取得して解析する
    response = requests.get(load_url)
    response.encoding = 'euc-jp' 
    soup = BeautifulSoup(response.text, 'html.parser')

    structurs = soup.find_all(class_='topic')
    # 必要なデータの抽出
    for elements in structurs:   

        pub_date_text = elements.find(class_='post-detail').find('span').get_text()
        pattern = r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
        pub_date_string = re.findall(pattern, pub_date_text)[-1]
        pub_date = datetime.strptime(pub_date_string, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%dT%H:%M:%SZ')

        name = elements.find(class_='divTableCell col2').find("h2").string

        price_img_key = elements.find(class_='divTableCell col1').find("img")['src'].split('/')[-1]
        if price_img_key in price_list:
            price = price_list[price_img_key]
        else:
            continue

        address = 'hogehoge'
        print("data insert")
        print("pub_date: {} name: {} price: {} address: {}".format(pub_date,name,price,address))
        data_insert(pub_date,name,price,address)  



if __name__ == "__main__":
    # load_url = "http://bbs.jpcanada.com/listing.php?bbs=3"
    load_url = "http://bbs.jpcanada.com/topics.php?bbs=3&msgid=176221&order=0&cat=&icon="
    jpcanada_html_parser(load_url)

