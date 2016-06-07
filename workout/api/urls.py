from django.conf.urls import url

from rest_framework import routers

from . import views


urlpatterns = []

router = routers.DefaultRouter()
router.register('exercise', views.ExerciseViewSet)
router.register('training', views.TrainingViewSet)

urlpatterns += router.urls