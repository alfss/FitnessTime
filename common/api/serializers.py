from rest_framework import serializers
from django.contrib.auth.models import User, Group

class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:common:user-detail')
    class Meta:
        model = User
        fields = ('id', 'username', 'url', )


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:common:group-detail')
    class Meta:
        model = Group
        fields = ('id', 'name', 'url')
