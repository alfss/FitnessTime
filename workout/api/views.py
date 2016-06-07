from rest_framework import permissions, viewsets
from rest_framework.response import Response

from workout.api.permissions import IsOwnerPermission
from . import serializers
from .. import models
import logging
logger = logging.getLogger(__name__)

class TrainingViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerPermission)
    queryset = models.Training.objects.all()
    serializer_class = serializers.TrainingSerializer

    def get_queryset_list(self):
        return models.Training.objects.filter(owner=self.request.user.pk).order_by('-id')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset_list())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

class ExerciseViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerPermission)

    queryset = models.Exercise.objects.all().order_by('-id')
    serializer_class = serializers.ExerciseSerializer

    def get_queryset(self):
        return models.Exercise.objects.filter(training__owner=self.request.user.pk).order_by('-priority')