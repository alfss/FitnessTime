from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.response import Response

from common.models import User
from . import serializers


class UserProfileView(RetrieveUpdateAPIView):

    serializer_class = serializers.UserProfileSerializer

    def get_object(self):
        return self.request.user

class UserChangePasswordView(UpdateAPIView):

    serializer_class = serializers.UserChangePasswordSerializer
    model = User

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):

        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)

            if serializer.data.get('new_password') !=  serializer.data.get('new_confirm_password'):
                return Response({"new_confirm_password": ["Those passwords don't match."]}, status=status.HTTP_400_BAD_REQUEST)

            self.object.set_password(serializer.data.get("new_confirm_password"))
            self.object.save()
            return Response("Success.", status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)