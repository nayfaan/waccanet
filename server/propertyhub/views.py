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
from operator import and_
import re
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.permissions import IsAuthenticated  


class PropertyViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAuthenticated]
    queryset = Property.objects.prefetch_related('images').order_by('-id')
    serializer_class = PropertySerializer

    @action(detail=False)
    def property_search(self, request):
        # properties_objects = Property.objects.prefetch_related('images').order_by('-id')
        properties_objects = self.queryset
        #get query parameter 
        search_query = request.GET.get('search_query')
        page = request.GET.get('page','1')
        properties_per_page=request.GET.get('properties_per_page','20')

        if search_query:
            query_list = []
            query = re.sub(r'\s+', ' ', search_query)  # 正規表現で任意の空白文字を半角スペースに統一
        
            for q_word in query.split(' '):
                if q_word.strip():  # 空白文字でないことを確認
                    query_list.append(q_word)            

            try:
                query = reduce(
                    and_, [ Q(description__icontains=q) for q in query_list]
                )
                properties_objects = properties_objects.filter(query).distinct() # 検索

            except Exception as err:
                return Response(f"Invalid filter Unexpected {err}, {type(err)}",status=status.HTTP_400_BAD_REQUEST)

        paginator = Paginator(properties_objects, properties_per_page)
        try:
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
                image_binary_data = image.read()
                Image.objects.create(property=property_instance,file_name=str(image.name),image_data=image_binary_data)
            
            return Response('Property and Images created successfully', status=status.HTTP_201_CREATED)
        else:
          return Response(property_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class OwnerList(generics.ListAPIView):
    permission_classes = [HasAPIKey | IsAuthenticated]
    queryset=Owner.objects.all()
    serializer_class = OwnerSerializer
