from rest_framework import viewsets

from common.models import User as UserModel
from workout.api.permissions import ReadOnlyPermission
from . import serializers



class User(viewsets.ModelViewSet):
    lookup_field = 'uuid'
    lookup_value_regex = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'

    queryset = UserModel.objects.all().order_by('-id')
    serializer_class = serializers.UserSerializer
    permission_classes = (ReadOnlyPermission, )