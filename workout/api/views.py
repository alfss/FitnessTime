from rest_framework import permissions, viewsets, filters
from workout.api.filters import AnyCanGetTraningByIdFilter
from workout.api.permissions import IsOwnerPermission
from . import serializers
from .. import models
import logging
logger = logging.getLogger(__name__)

class TrainingViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerPermission)
    queryset = models.Training.objects.all()
    serializer_class = serializers.TrainingSerializer
    filter_backends = (AnyCanGetTraningByIdFilter, filters.SearchFilter, filters.OrderingFilter, )
    search_fields = ('title', )
    ordering_fields = ('title', 'id', )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

class ExerciseViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerPermission)
    serializer_class = serializers.ExerciseSerializer

    filter_backends = (filters.SearchFilter, filters.OrderingFilter, )
    search_fields = ('title', )
    ordering_fields = ('title', 'id', 'priority', )
    ordering = ('priority', )

    def get_queryset(self):
        queryset = models.Exercise.objects.filter(training__owner=self.request.user.pk)
        training = self.request.query_params.get('training', None)
        if training is not None:
            queryset = queryset.filter(training=training)
        return queryset