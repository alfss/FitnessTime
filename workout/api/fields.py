from rest_framework import serializers
from workout.models import Training, Label

class TrainingField(serializers.RelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        queryset = Training.objects.filter(owner=user)
        return queryset

    def to_representation(self, value):
        return value.uuid

    def to_internal_value(self, data):
        return Training.objects.get(uuid=data)

class LabelField(serializers.RelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        queryset = Label.objects.filter(owner=user)
        return queryset

    def to_representation(self, value):
        return value.uuid

    def to_internal_value(self, data):
        return Label.objects.get(uuid=data)
