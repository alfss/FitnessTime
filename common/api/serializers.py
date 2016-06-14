from rest_framework import serializers
from common.models import User


class UserMiniSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:common:user-detail', lookup_field='uuid')

    class Meta:
        model = User
        fields = ('uuid', 'username','url', )


class UserSerializer(UserMiniSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:common:user-detail', lookup_field='uuid')

    class Meta:
        model = User
        fields = ('uuid', 'username', 'email', 'first_name', 'last_name' ,'url', )
