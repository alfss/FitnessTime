from django.contrib import admin

# Register your models here.
from imagekit.admin import AdminThumbnail

from workout.models import Exercise, GroupExercise


class ExerciseAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'admin_thumbnail']
    admin_thumbnail = AdminThumbnail(image_field='example_photo')

admin.site.register(Exercise, ExerciseAdmin)


class GroupExerciseAdmin(admin.ModelAdmin):
    pass
admin.site.register(GroupExercise, GroupExerciseAdmin)

