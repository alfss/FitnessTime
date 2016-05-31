from django.conf import settings
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

from workout.tools import upload_to_id_image

class GroupExercise(models.Model):
    title = models.CharField( max_length=255 )
    owner = models.ForeignKey( settings.AUTH_USER_MODEL )

    unique_together = (("title", "owner"),)

    def __str__(self):
        return  "%s owner:%s" % (self.title, self.owner)

class Exercise(models.Model):
    priority = models.IntegerField( default=1 ) # for sorting
    title = models.CharField( max_length=255, unique=True)
    repeat = models.CharField( max_length=255, default=3)
    weight = models.FloatField() #in kg
    rest_time = models.IntegerField() #in seconds
    example_photo = ProcessedImageField(default=None,
                                        upload_to=upload_to_id_image,
                                        processors=[ResizeToFill(400, 400)],
                                        format='JPEG',
                                        options={'quality': 99})

    group_exercise = models.ForeignKey( 'GroupExercise',
                                        related_name='exercises',
                                        on_delete = models.CASCADE, )

    def save(self, *args, **kwargs):
        print (self.example_photo)
        super(Exercise, self).save(*args, **kwargs)

    def __str__(self):
        return  "%s group_exercise = %s" % (self.title, self.group_exercise)

