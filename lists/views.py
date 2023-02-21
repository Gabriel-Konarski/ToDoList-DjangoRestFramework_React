# Models
from .models import Category, List, Item

# Serializers
from .serializers import ListSerializer, ItemSerializer

#  Django Rest Framework
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Authentication JWT
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# JWT classes
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# App views
@api_view(['GET', 'POST', 'DELETE'])
def lists(request):
    if request.method == 'GET':
        user = request.user.id
        lists = List.objects.filter(category__user=user)

        serializer = ListSerializer(lists, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        data = request.data

        listcat, created = Category.objects.get_or_create(
            name=data['listCat'],
            user=request.user)

        new_list = List.objects.create(
            name=data['listName'],
            category=listcat
        )

        serializer = ListSerializer(new_list, many=False)

        return Response(serializer.data)

    elif request.method == 'DELETE':
        data = request.data

        lista = List.objects.get(id=data)
        lista.delete()

        return Response('List was deleted!')


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def viewList(request, pk):
    if request.method == 'GET':
        items = Item.objects.filter(lists=pk)
        serializer = ItemSerializer(items, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        data = request.data

        lista = List.objects.get(id=pk)

        new_item = Item.objects.create(
            lists=lista,
            name=data,
            complete=False
        )

        serializer = ItemSerializer(new_item, many=False)

        return Response(serializer.data)

    elif request.method == 'DELETE':
        data = request.data

        item = Item.objects.get(id=data)
        item.delete()

        return Response('Item was deleted!')

    elif request.method == 'PATCH':
        item_id = request.data

        item = Item.objects.get(id=item_id)
        if item.complete == True:
            compl = False
        else:
            compl = True

        serializer = ItemSerializer(
            item, data={'complete': compl}, partial=True)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)
