from django.conf.urls import url

from rest_framework import routers

from . import views


urlpatterns = []

router = routers.DefaultRouter()
router.register('exercise', views.ExerciseViewSet, 'exercise')
router.register('training', views.TrainingViewSet, 'training')
router.register('label', views.LabelViewSet, 'label')

urlpatterns += router.urls