from rest_framework import serializers
from common.api.serializers import UserSerializer
from workout.models import Training, Exercise

class TrainingPKField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context['request'].user
        queryset = Training.objects.filter(owner=user)
        return queryset

class ExerciseSerializer(serializers.ModelSerializer):
    training = TrainingPKField()
    example_photo = serializers.ImageField(required=False)
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:workout:exercise-detail')

    def filter_training(self, queryset):
        request = self.context['request']
        return queryset.filter(owner=request.user)

    class Meta:
        model = Exercise
        fields = ('url', 'id', 'title', 'repeat', 'weight', 'rest_time', 'example_photo', 'training', )

class TrainingSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:workout:training-detail')

    class Meta:
        model = Training
        fields = ('url', 'id', 'owner', 'title', 'exercises', )


