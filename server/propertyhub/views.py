from django.shortcuts import render
from rest_framework import viewsets
from .models import Property,Owner,Image
from .serializers import PropertySerializer,OwnerSerializer
from rest_framework import generics
from  django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.prefetch_related('images').all()
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields =['price','reference']

    @action(detail=False)
    def get_all_data(self, request):
        get_all_data = Property.objects.prefetch_related('images').all()
        serializer = self.get_serializer(get_all_data, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def add_property_data(self, request):

        property_data = request.data  # プロパティのデータ
        images = request.FILES.getlist('images')  # 送信された複数の画像

        # プロパティデータをシリアライザーで検証・保存
        property_serializer = PropertySerializer(data=property_data)
        if property_serializer.is_valid():
            property_instance = property_serializer.save()

            # 送信された画像をImageモデルと関連付けて保存
            for image in images:
                Image.objects.create(property=property_instance, image=image)
            
            return Response('Property and Images created successfully', status=status.HTTP_201_CREATED)
        else:
          return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class OwnerList(generics.ListAPIView):
    queryset=Owner.objects.all()
    serializer_class = OwnerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields =['name']
    def get_queryset(self):
        user=self.request.user
        print(user)
        return Owner.objects.filter(name=user)