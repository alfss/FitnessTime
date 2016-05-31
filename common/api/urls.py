from django.conf.urls import url

from rest_framework import routers

from . import views


urlpatterns = []

router = routers.DefaultRouter()
router.register('users', views.User)
router.register('groups', views.Group)

urlpatterns += router.urls