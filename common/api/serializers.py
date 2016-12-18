from rest_framework import serializers
from common.models import User


class UserMiniSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('uuid', 'username', )

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('uuid', 'username', 'email', 'first_name', 'last_name', 'password', )
        extra_kwargs = {
            'password': {'write_only': True}
        }
