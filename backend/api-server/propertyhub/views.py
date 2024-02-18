from rest_framework import viewsets
from .models import Property,Owner,Image
from .serializers import PropertySerializer,OwnerSerializer
from rest_framework import generics
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
        filter_price_to_query = request.GET.get('price_to','99999')
        filter_areas_query = request.GET.get('areas')
        filter_reference_query = request.GET.get('reference')
        page = request.GET.get('page','1')
        properties_per_page=request.GET.get('properties_per_page','20')
        try:
            properties_objects=self.property_search(properties_objects,search_query)
            properties_objects=self.property_filter_price(properties_objects,int(filter_price_from_query),int(filter_price_to_query))
            properties_objects=self.property_filter_areas(properties_objects,filter_areas_query)
            properties_objects=self.property_filter_reference(properties_objects,filter_reference_query)
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
            properties_objects = properties_objects.filter(query).distinct() # 検索

        return properties_objects 
    
    def property_filter_price(self,properties_objects,price_from,price_to):
  
        query = Q(price__gte=price_from) & Q(price__lte=price_to)         
        properties_objects = properties_objects.filter(query)

        return properties_objects 
    
    def property_filter_areas(self, properties_objects,filter_areas_query):
  
        if filter_areas_query:
            query = reduce(
                or_, [ Q(description__icontains=q) for q in filter_areas_query.split('_')]
            )
            properties_objects = properties_objects.filter(query).distinct()

        return properties_objects 
    
    def property_filter_reference(self, properties_objects,filter_reference_query):
        for _ in range(10):
            print(filter_reference_query)
            print(filter_reference_query.split('_'))
            print(filter_reference_query.split('_')[0])

  
        if filter_reference_query:
            query = reduce(
                or_, [ Q(reference__icontains=q) for q in filter_reference_query.split('_')]
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
            property_instance = property_serializer.save()

            # 送信された画像をImageモデルと関連付けて保存
            for image in images:
                Image.objects.create(property=property_instance,file_name=str(image.name),image_path=image)
            
            return Response('Property and Images created successfully', status=status.HTTP_201_CREATED)
        else:
          return Response(property_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class OwnerList(generics.ListAPIView):
    permission_classes = [HasAPIKey | IsAuthenticated]
    queryset=Owner.objects.all()
    serializer_class = OwnerSerializer
