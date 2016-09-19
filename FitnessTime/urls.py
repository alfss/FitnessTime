"""FitnessTime URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import login, logout_then_login, password_reset, \
    password_reset_done, password_reset_confirm, password_reset_complete, \
    password_change_done, password_change
from django.conf import settings
from django.conf.urls.static import static

from FitnessTime import views
from FitnessTime.forms import SiginForm
from FitnessTime.views import register

urlpatterns = [
    url(r'^$', views.main, name='main'),
    url(r'^app', views.app, name='main-app'),
    #login
    url(r'^signin/$', login, { 'authentication_form': SiginForm }, name='login'),
    url(r'^register/$', register, name='register'),
    url(r'^logout/$', logout_then_login, name='logout'),
    #password
    url(r'^password-change/$', password_change, name='password_change'),
    url(r'^password-change/done/$', password_change_done, name='password_change_done'),
    url(r'^password-reset/$', password_reset, name='password_reset'),
    url(r'^password-reset/done/$', password_reset_done, name='password_reset_done'),
    url(r'^password-reset/token/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        password_reset_confirm, name='password_reset_confirm'),
    url(r'^password-reset/token/done/$', password_reset_complete, name='password_reset_complete'),

    url(r'^admin/', admin.site.urls),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^api/v1/', include('FitnessTime.urls_api', namespace='api-v1')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]




if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)