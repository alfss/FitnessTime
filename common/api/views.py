from django.contrib.auth import models, get_user_model
from rest_framework import permissions
from rest_framework import viewsets
from . import serializers

ModelUser = get_user_model()

class Group(viewsets.ModelViewSet):
    queryset = models.Group.objects.all().order_by('-id')
    serializer_class = serializers.GroupSerializer

class User(viewsets.ModelViewSet):
    queryset = ModelUser.objects.all().order_by('-id')
    serializer_class = serializers.UserSerializer
