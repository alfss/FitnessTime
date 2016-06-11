from django.contrib import admin

# Register your models here.
from imagekit.admin import AdminThumbnail

from workout.models import Exercise, Training, Label


class ExerciseAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'admin_thumbnail']
    admin_thumbnail = AdminThumbnail(image_field='example_photo')

admin.site.register(Exercise, ExerciseAdmin)


class TraninngAdmin(admin.ModelAdmin):
    pass
admin.site.register(Training, TraninngAdmin)


class LabelAdmin(admin.ModelAdmin):
    pass
admin.site.register(Label, LabelAdmin)
