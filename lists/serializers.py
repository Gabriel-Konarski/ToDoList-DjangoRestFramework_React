from rest_framework.serializers import ModelSerializer
from .models import Category, List, Item


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ListSerializer(ModelSerializer):
    category = CategorySerializer(many=False)

    class Meta:
        model = List
        fields = '__all__'


class ItemSerializer(ModelSerializer):
    lists = ListSerializer(many=False)

    class Meta:
        model = Item
        fields = '__all__'
