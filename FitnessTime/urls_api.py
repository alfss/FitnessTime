from django.conf.urls import include, url


urlpatterns = [
    url(r'^workout/', include('workout.api.urls', namespace='workout', app_name='workout')),
]