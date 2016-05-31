from rest_framework import generics
from rest_framework import viewsets

from . import serializers
from .. import models

class GroupExerciseSet(viewsets.ModelViewSet):
    queryset = models.GroupExercise.objects.all().order_by('-id')
    serializer_class = serializers.GroupExerciseSerializer

class ExerciseSet(viewsets.ModelViewSet):
    queryset = models.Exercise.objects.all().order_by('-id')
    serializer_class = serializers.ExerciseSerializer
