from django.shortcuts import render
from rest_framework import viewsets
from .models import Property,Owner
from .serializers import PropertySerializer,OwnerSerializer
from rest_framework import generics
from  django_filters.rest_framework import DjangoFilterBackend

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields =['price','reference']

class OwnerList(generics.ListAPIView):
    queryset=Owner.objects.all()
    serializer_class = OwnerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields =['name','roll']
    def get_queryset(self):
        user=self.request.user
        print(user)
        return Owner.objects.filter(name=user)