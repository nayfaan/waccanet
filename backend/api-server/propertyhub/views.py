from rest_framework import viewsets
from .models import Property,Owner,Image
from .serializers import PropertySerializer,OwnerSerializer
from django.core.mail import send_mail
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.core.paginator import Paginator
from functools import reduce
from operator import and_,or_
import re
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.permissions import IsAuthenticated  
from django.db import transaction


class PropertyViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAuthenticated]
    queryset = Property.objects.prefetch_related('images').order_by('-id')
    serializer_class = PropertySerializer

    @action(detail=False)
    def properties_info_get(self, request):
        # properties_objects = Property.objects.prefetch_related('images').order_by('-id')
        properties_objects = self.queryset
        #get query parameter 
        search_query = request.GET.get('search_query')
        filter_price_from_query = request.GET.get('price_from','0')
        filter_price_to_query = request.GET.get('price_to')
        filter_roomTypes_query = request.GET.get('roomTypes')
        filter_roommates_query = request.GET.get('roommates')
        filter_gender_query = request.GET.get('gender')
        filter_areas_query = request.GET.get('areas')
        filter_stations_query = request.GET.get('stations')
        filter_utilities_query = request.GET.get('utilities')
        filter_wifi_query = request.GET.get('wifi')
        filter_furnished_query = request.GET.get('furnished')
        filter_laundry_query = request.GET.get('laundry')
        filter_takeover_query = request.GET.get('takeover')
        filter_moveInDate_query = request.GET.get('moveInDate')
        filter_payment_method_query = request.GET.get('payment-method')
        filter_onlineViewing_query = request.GET.get('onlineViewing')
        filter_minimumStay_query = request.GET.get('minimumStay')
        filter_references_query = request.GET.get('references')
        page = request.GET.get('page','1')
        properties_per_page=request.GET.get('properties_per_page','20')
        try:
            properties_objects=self.property_search(properties_objects,search_query)
            properties_objects=self.property_filter_price(properties_objects,filter_price_from_query,filter_price_to_query)

            properties_objects=self.property_filter_dummy(properties_objects,filter_roomTypes_query)
            properties_objects=self.property_filter_dummy(properties_objects,filter_roommates_query)
            properties_objects=self.property_filter_dummy(properties_objects,filter_gender_query)

            properties_objects=self.property_filter_areas(properties_objects,filter_areas_query)
            properties_objects=self.property_filter_stations(properties_objects,filter_stations_query)

            properties_objects=self.property_filter_utilities(properties_objects,filter_utilities_query)
            properties_objects=self.property_filter_wifi(properties_objects,filter_wifi_query)
            properties_objects=self.property_filter_furnished(properties_objects,filter_furnished_query)
            properties_objects=self.property_filter_laundry(properties_objects,filter_laundry_query)

            properties_objects=self.property_filter_dummy(properties_objects,filter_takeover_query)
            properties_objects=self.property_filter_dummy(properties_objects,filter_moveInDate_query)
            properties_objects=self.property_filter_dummy(properties_objects,filter_payment_method_query)
            properties_objects=self.property_filter_dummy(properties_objects,filter_onlineViewing_query)
            properties_objects=self.property_filter_dummy(properties_objects,filter_minimumStay_query)

            properties_objects=self.property_filter_references(properties_objects,filter_references_query)
            paginator = Paginator(properties_objects, properties_per_page) # type: ignore
            properties_objects = paginator.page(page)
        except Exception as err:
            return Response(f"Invalid page Unexpected {err}, {type(err)}",status=status.HTTP_400_BAD_REQUEST)
            
        serializer = self.get_serializer(properties_objects, many=True)

        modified_data = {
            'total': paginator.count,#トータルの物件数
            'current_page':int(page),#現在のページ番号
            'properties_per_page':int(properties_per_page),
            'num_pages': paginator.num_pages, #ページ数
            'results': serializer.data,
        }

        return Response(modified_data)
    
    def property_filter_dummy(self, properties_objects,filter_query):
  
        if filter_query:
            properties_objects = properties_objects.none()

        return properties_objects 
    
    def property_search(self, properties_objects,search_query):
       
        if search_query:
            query_list = []
            query = re.sub(r'\s+', ' ', search_query)  # 正規表現で任意の空白文字を半角スペースに統一        
            for q_word in query.split(' '):
                if q_word.strip():  # 空白文字でないことを確認
                    query_list.append(q_word)            

            query = reduce(
                and_, [ Q(description__icontains=q) for q in query_list]
            )
            properties_objects = properties_objects.filter(query) # 検索

        return properties_objects 
    
    def property_filter_price(self,properties_objects,price_from,price_to):

        if price_to is None:
            query = Q(price__gte=int(price_from))
        else:
            query = Q(price__gte=int(price_from)) & Q(price__lte=int(price_to))     

        properties_objects = properties_objects.filter(query)

        return properties_objects 

    def property_filter_areas(self, properties_objects,filter_areas_query):
  
        if filter_areas_query:
            description_queries = [Q(description__icontains=q) for q in filter_areas_query.split('_')]
            area_queries = [Q(area=q) for q in filter_areas_query.split('_')]

            query_description = reduce(or_, description_queries)
            query_area = reduce(or_, area_queries)
            combined_query = query_description | query_area

            properties_objects = properties_objects.filter( combined_query )

        return properties_objects 
    
    def property_filter_stations(self, properties_objects,filter_stations_query):
  
        if filter_stations_query:
            station_queries = [Q(station=q) for q in filter_stations_query.split('_')]
            query_station = reduce(or_, station_queries)

            properties_objects = properties_objects.filter( query_station )

        return properties_objects   

    def property_filter_utilities(self, properties_objects,filter_utilities_query):
  
        if filter_utilities_query:
            properties_objects = properties_objects.filter(utilities=True)
        return properties_objects
      
    def property_filter_wifi(self, properties_objects,filter_wifi_query):
        if filter_wifi_query:
            properties_objects = properties_objects.filter(wifi=True)
        return properties_objects 

    def property_filter_furnished(self, properties_objects,filter_furnished_query):
  
        if filter_furnished_query:
            properties_objects = properties_objects.filter(furnished=True)
        return properties_objects 

    def property_filter_laundry(self, properties_objects,filter_laundry_query):
  
        if filter_laundry_query:
            properties_objects = properties_objects.filter(laundry=True)
        return properties_objects 
    
    def property_filter_references(self, properties_objects,filter_references_query):
  
        if filter_references_query:
            query = reduce(
                or_, [ Q(reference__icontains=q) for q in filter_references_query.split('_')]
            )
            properties_objects = properties_objects.filter(query)

        return properties_objects 
    
    @action(detail=False)
    def property_id(self, request):
        #get query parameter 
        get_id = int(request.GET.get('id'))
        properties_objects = Property.objects.prefetch_related('images').get(id=get_id)
        try:
            property_serializer = PropertySerializer(properties_objects)
            return Response(property_serializer.data, status=status.HTTP_201_CREATED)
        except Exception as err:
            return Response(f"Invalid  Unexpected {err}, {type(err)}",status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['post'])
    def property_add(self, request):

        property_data = request.data  # プロパティのデータ
        images = request.FILES.getlist('images')  # 送信された複数の画像

        # プロパティデータをシリアライザーで検証・保存
        property_serializer = PropertySerializer(data=property_data)
        if property_serializer.is_valid():
            with transaction.atomic():

                property_instance = property_serializer.save()

                # 送信された画像をImageモデルと関連付けて保存
                for image in images:
                    Image.objects.create(property=property_instance,file_name=str(image.name),image_path=image)
            
                if property_data['reference'] == 'Waccanet':
                    import random, string
                    #仮のユーザ名自動生成
                    user_name='waccanet-'+''.join(random.choice(string.ascii_letters + string.digits) for i in range(10))
                    #パスワード自動生成
                    password = ''.join(random.choice(string.ascii_letters + string.digits) for i in range(20))

                    owner_data = {
                    'user_name': user_name,
                    'password': password,
                    'email': property_data['email']
                    }

                    # プロパティデータをシリアライザーで検証・保存
                    owner_serializer = OwnerSerializer(data=owner_data)
                    if owner_serializer.is_valid():
            
                        # UserIDがすでに使われていた場合
                        if Owner.objects.filter(user_name=owner_data['user_name']).exists():
                            transaction.set_rollback(True)  # ロールバックをマーク

                            return Response({'error': 3}, status=status.HTTP_400_BAD_REQUEST)

                        try:
                            # トランザクション内でOwnerを保存
                            owner_instance = owner_serializer.save()
                            property_instance.owner = owner_instance
                            property_instance.save()  # プロパティにOwnerを関連付けて保存
                        except:
                            # データベースエラー
                            return Response({'error': 11}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    else:
                        transaction.set_rollback(True)  # ロールバックをマーク
                        return Response(owner_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                    
                    #オーナに登録が完了したことを通知
                    self.send_mail2owner(owner_data)

            return Response('Property Registration successfully', status=status.HTTP_201_CREATED)
        else:
          return Response(property_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
   
    @action(detail=True)
    def property_exists(self, request,pk=None):
        owner_name = pk
        # 部件情報があるかの確認
        if Owner.objects.filter(user_name=owner_name).exists():
            return Response({'exist': True})
        else:
            return Response({'exist': False})
        

    def send_mail2owner(self,owner_data):
            
            user_name = owner_data['user_name']
            password = owner_data['password']
            email_address=owner_data['email']
            """題名"""
            subject = 'waccanet物件登録の完了のお知らせ'

            """本文"""
            message = 'このたびは、waccanetに物件情報の登録をしていただき誠にありがとうございます。\n\n'\
                        '物件情報を削除する場合は、下記のURLにアクセス後、パスワードを入力してください。\n'\
                        '物件情報を削除する\n'\
                        'https://www.waccanet.com/properties/delete/{} \n\n'\
                        'password {}'.format(user_name,password)
            
            """宛先メールアドレス"""
            recipient_list = [
                email_address
            ]
            send_mail(subject, message, None, recipient_list)

            return 
 

    @action(detail=True, methods=['post'])
    def property_delete (self,request,pk=None):

        owner_name = pk
        password = request.data['password']

        try:
            owner_instance = Owner.objects.get(user_name=owner_name)
        except:
            return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)

        # プロパティが存在するか確認
        if owner_instance:
            with transaction.atomic():
                if owner_instance.password == password:
                    # オブジェクトの削除
                    owner_instance.delete()
                    return Response({'message': 'Property deleted successfully'}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({'error': 'password is incorrect.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def sendMail2ads2owner(self, request):

        email_address=request.data['email']
        """題名"""
        subject = 'waccanetに物件登録をしませんか？'

        """本文"""
        message = 'はじめまして、我々は、某webサイトに変わる物件紹介サイトを作成をしてる有志のプログラマです。\n'\
                    'もし、宜しければ私たちのサイトに物件情報を登録してみませんか？ \n' \
                    '物件情報の登録は下記のURLから可能です。 \n\n ' \
                    'https://www.waccanet.com/properties/register \n\n' \
                    '少しでも、みなさまのお役に立てることをここより願っています。\n' \
                    'Waccanet一同より'
        

        """送信元メールアドレス"""
        from_email = ""
        """宛先メールアドレス"""
        recipient_list = [
            email_address
        ]
        send_mail(subject, message, from_email, recipient_list)

        return 