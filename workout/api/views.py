import uuid

from rest_framework import permissions, viewsets, filters
from workout.api.filters import AnyCanGetTraningByIdFilter
from workout.api.permissions import IsOwnerPermission
from . import serializers
from .. import models
import logging
logger = logging.getLogger(__name__)

class TrainingViewSet(viewsets.ModelViewSet):
    lookup_field = 'uuid'
    lookup_value_regex = '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}'

    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerPermission)
    queryset = models.Training.objects.all()
    serializer_class = serializers.TrainingSerializer
    filter_backends = (AnyCanGetTraningByIdFilter, filters.SearchFilter, filters.OrderingFilter, )
    search_fields = ('title', )
    ordering_fields = ('title', 'uuid', )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = self.queryset
        label = self.request.query_params.get('label', None)

        try:
            uuid.UUID(label)
            queryset = queryset.filter(label__uuid=label)
        except (ValueError, TypeError):
            pass

        if label == 'null':
            queryset = queryset.filter(label__uuid=None)

        return queryset

class ExerciseViewSet(viewsets.ModelViewSet):
    lookup_field = 'uuid'
    lookup_value_regex = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'

    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerPermission)
    serializer_class = serializers.ExerciseSerializer

    filter_backends = (filters.SearchFilter, filters.OrderingFilter, )
    search_fields = ('title', )
    ordering_fields = ('title', 'uuid', 'priority', )
    ordering = ('priority', )

    def get_queryset(self):
        queryset = models.Exercise.objects.filter(training__owner=self.request.user.pk)
        training = self.request.query_params.get('training', None)
        if training is not None:
            queryset = queryset.filter(training__uuid=training)
        return queryset

class LabelViewSet(viewsets.ModelViewSet):
    lookup_field = 'uuid'
    lookup_value_regex = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'

    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerPermission)
    serializer_class = serializers.LabelSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, )
    search_fields = ('title', )
    ordering_fields = ('title', 'uuid', )
    ordering = ('title', )


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = models.Label.objects.filter(owner=self.request.user.pk)
        return queryset