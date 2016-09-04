from rest_framework import serializers
from common.api.serializers import UserMiniSerializer
from workout.api.fields import TrainingField, LabelField
from workout.models import Training, Exercise, Label


class ExerciseSerializer(serializers.ModelSerializer):
    training = TrainingField()
    example_photo = serializers.ImageField(required=False)
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:workout:exercise-detail', lookup_field='uuid')

    def filter_training(self, queryset):
        request = self.context['request']
        return queryset.filter(owner=request.user)

    class Meta:
        model = Exercise
        fields = ('url', 'uuid', 'title', 'repeat', 'weight', 'rest_time', 'example_photo', 'training', )

class TrainingSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)
    owner = UserMiniSerializer(read_only=True, default=serializers.CurrentUserDefault())
    label = LabelField(required=False, allow_null=True)
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:workout:training-detail', lookup_field='uuid')

    class Meta:
        model = Training
        fields = ('url', 'uuid', 'owner', 'title', 'color', 'label', 'exercises', )

class LabelSerializer(serializers.ModelSerializer):
    trainings = TrainingSerializer(many=True, read_only=True)
    owner = UserMiniSerializer(read_only=True, default=serializers.CurrentUserDefault())
    url = serializers.HyperlinkedIdentityField(view_name='api-v1:workout:label-detail', lookup_field='uuid')

    class Meta:
        model = Label
        fields = ('url', 'uuid', 'title', 'owner', 'trainings', )



