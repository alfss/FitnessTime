from rest_framework import serializers
from common.api.serializers import UserSerializer
from workout.models import GroupExercise, Exercise

class GroupExercisePKField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        queryset = GroupExercise.objects.filter(owner=user)
        return queryset

class ExerciseSerializer(serializers.ModelSerializer):
    group_exercise = GroupExercisePKField()
    example_photo = serializers.ImageField(required=False)
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:workout:exercise-detail')

    def filter_group_exercise(self, queryset):
        request = self.context['request']
        return queryset.filter(owner=request.user)

    class Meta:
        model = Exercise
        fields = ('url', 'id', 'title', 'repeat', 'weight', 'rest_time', 'example_photo', 'group_exercise', )

class GroupExerciseSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:workout:groupexercise-detail')

    class Meta:
        model = GroupExercise
        fields = ('url', 'id', 'owner', 'title', 'exercises', )


