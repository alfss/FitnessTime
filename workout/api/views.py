from rest_framework import permissions
from rest_framework import generics
from rest_framework import viewsets

from . import serializers
from .. import models

class GroupExercise(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    queryset = models.GroupExercise.objects.all().order_by('-id')
    serializer_class = serializers.GroupExerciseSerializer

class Exercise(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    queryset = models.Exercise.objects.all().order_by('-id')
    serializer_class = serializers.ExerciseSerializer
