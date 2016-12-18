from rest_framework.generics import RetrieveUpdateAPIView

from . import serializers


class UserProfileView(RetrieveUpdateAPIView):

    serializer_class = serializers.UserProfileSerializer

    def get_object(self):
        return self.request.user
