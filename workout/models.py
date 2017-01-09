import uuid

from django.conf import settings
from django.db import models
from django.db.models import F
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

from workout.tools import upload_to_id_image

class Training(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    title = models.CharField( max_length=255 )
    owner = models.ForeignKey( settings.AUTH_USER_MODEL )
    color = models.CharField( max_length=255, default='' )
    label = models.ForeignKey('Label',
                                related_name='trainings',
                                on_delete = models.SET_NULL,
                                default=None,
                                null=True
                              )
    sequence_priority = models.IntegerField( default=1 )

    class Meta:
        unique_together = (("title", "owner"),)

    def __str__(self):
        return  "%s owner:%s" % (self.title, self.owner)

    def is_owner(self, user):
        return self.owner == user

    def set_order_exercises(self, exercises_list):
        exercises_oreder_list = dict(zip(exercises_list, range(1, len(exercises_list) + 1)))

        for exercise in Exercise.objects.filter(uuid__in=exercises_list):
            try:
                exercise.priority = exercises_oreder_list[str(exercise.uuid)]
                exercise.save()
            except KeyError:
                pass

class Exercise(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    priority = models.IntegerField( default=1 ) # for sorting
    title = models.CharField( max_length=255 )
    repeat = models.CharField( max_length=255, default=3)
    weight = models.FloatField() #in kg
    rest_time = models.IntegerField() #in seconds
    example_photo = ProcessedImageField(default=None,
                                        upload_to=upload_to_id_image,
                                        processors=[ResizeToFill(400, 400)],
                                        format='JPEG',
                                        options={'quality': 99})

    training = models.ForeignKey('Training',
                                 related_name='exercises',
                                 on_delete = models.CASCADE,)
    class Meta:
        unique_together = (("title", "training"),)
        ordering = ['priority']

    def is_owner(self, user):
        return self.training.owner == user

    def save(self, *args, **kwargs):
        if not self.pk:
            Training.objects.filter(uuid=self.training.uuid).\
                update(sequence_priority=F('sequence_priority') + 1)
            self.priority = self.training.sequence_priority
        super(Exercise, self).save(*args, **kwargs)

    def __str__(self):
        return  "%s training = %s" % (self.title, self.training)


class Label(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    title = models.CharField( max_length=255 )
    owner = models.ForeignKey( settings.AUTH_USER_MODEL )

    class Meta:
        unique_together = (("title", "owner"),)

    def __str__(self):
        return  "%s owner:%s" % (self.title, self.owner)

    def is_owner(self, user):
        return self.owner == user