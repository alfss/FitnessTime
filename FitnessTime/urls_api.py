from django.conf.urls import include, url


urlpatterns = [
    url(r'^workout/', include('workout.api.urls', namespace='workout', app_name='workout')),
    url(r'^common/', include('common.api.urls', namespace='common', app_name='common')),
]