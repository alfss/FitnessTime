from django.conf import settings
from django.db import models
from sorl.thumbnail import ImageField, get_thumbnail


class SetExercise(models.Model):
    title = models.CharField( max_length=255 )
    owner = models.ForeignKey( settings.AUTH_USER_MODEL )

    unique_together = (("title", "owner"),)

class Exercise(models.Model):
    priority = models.IntegerField( default=1 ) # for sorting
    title = models.CharField( max_length=255, unique=True)
    repeat = models.CharField( max_length=255, default=3)
    weight = models.FloatField() #in kg
    rest_time = models.IntegerField() #in seconds
    example_photo = ImageField(default=None)

    set_exercise = models.ForeignKey( 'SetExercise', on_delete = models.CASCADE, )

    def save(self, *args, **kwargs):
        if self.example_photo:
            self.example_photo = get_thumbnail(self.example_photo, '500x500', quality=99, format='JPEG')
        super(Exercise, self).save(*args, **kwargs)

