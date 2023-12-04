from rest_framework import serializers
from .models import Property,Owner


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id','pub_date', 'name','price','imags','description','reference']


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ["name","roll"]