from rest_framework import serializers
from .models import Property,Owner,Image
from .models import Owner

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['file_name','image_path']

class PropertySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True) 
    owner = OwnerSerializer(required=False)  # ownerが必須でない場合
    class Meta:
        model = Property
        fields = '__all__'