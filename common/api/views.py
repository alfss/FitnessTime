from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from common.api.filters import AnyCanGetUserByIdFilter
from common.models import User as UserModel
from workout.api.permissions import ReadOnlyPermission
from . import serializers

class User(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
           mixins.ListModelMixin, GenericViewSet):
    lookup_field = 'uuid'
    lookup_value_regex = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'

    queryset = UserModel.objects.all().order_by('-id')
    permission_classes = (ReadOnlyPermission, )

    filter_backends = (AnyCanGetUserByIdFilter, )

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return serializers.UserSerializer
        return serializers.UserMiniSerializer