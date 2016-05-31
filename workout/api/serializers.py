from rest_framework import serializers
from workout.models import GroupExercise, Exercise


class GroupExerciseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GroupExercise
        fields = ('title',)


class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Exercise
        fields = ('title', 'repeat', 'weight', 'rest_time', 'example_photo', )