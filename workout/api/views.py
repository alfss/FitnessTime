import uuid

from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, viewsets, filters
from rest_framework.decorators import detail_route
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

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
        queryset = queryset.prefetch_related('exercises')
        label = self.request.query_params.get('label', None)

        try:
            uuid.UUID(label)
            queryset = queryset.filter(label__uuid=label)
        except (ValueError, TypeError):
            pass

        if label == 'null':
            queryset = queryset.filter(label__uuid=None)

        return queryset

    #Custom methods
    @detail_route(methods=['post'], permission_classes=permission_classes)
    def set_order_exercises(self, request, uuid=None):
        '''
        Sets a new order of exercises

        json data example:
        { "exercise" : ["uuid exercise","uuid exercise2","uuid exercise3","uuid exercise4"] }
        {"exercise": ["4e42d81d-0ba7-4398-b1d9-a69ff7abbca0","b574e490-8a7f-4961-9daf-d51e6f1f459d"] }
        '''
        training = self.get_object()
        try:
            request.data
            training.set_order_exercises(request.data['exercises'])
        except (ParseError, ValueError) as error:
            return Response(
                'Invalid JSON - {0}'.format(error),
                status=HTTP_400_BAD_REQUEST
            )
        except (KeyError) as error:
            return Response(
                'Invalid JSON - KeyError not found: {0}'.format(error),
                status=HTTP_400_BAD_REQUEST
            )
        return Response({'status': request.data })

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