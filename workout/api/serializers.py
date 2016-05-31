from rest_framework import serializers
from common.api.serializers import UserSerializer
from workout.models import GroupExercise, Exercise


class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    group_exercise = serializers.PrimaryKeyRelatedField(queryset=GroupExercise.objects.all())
    example_photo = serializers.ImageField(required=False)

    class Meta:
        model = Exercise
        fields = ('id', 'title', 'repeat', 'weight', 'rest_time', 'example_photo', 'group_exercise', )

class GroupExerciseSerializer(serializers.HyperlinkedModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)

    class Meta:
        model = GroupExercise
        fields = ('id', 'owner', 'title', 'exercises', )


