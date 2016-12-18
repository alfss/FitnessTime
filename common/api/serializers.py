from rest_framework import serializers
from common.models import User


class UserMiniSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('uuid', 'username', )

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('uuid', 'username', 'email', 'first_name', 'last_name', )

class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, style={'input_type': 'password'})
    new_password = serializers.CharField(required=True, style={'input_type': 'password'})
    new_confirm_password = serializers.CharField(required=True, style={'input_type': 'password'})