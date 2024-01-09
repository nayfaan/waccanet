from rest_framework import serializers
from .models import Property,Owner,Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['file_name','image_data']

class PropertySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True) 
    class Meta:
        model = Property
        fields = ['id','pub_date', 'name','price','images' ,'description','reference']


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ["name","roll"]