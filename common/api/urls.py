from django.conf.urls import url

from . import views

urlpatterns = [
    url('^users/profile/$', views.UserProfileView.as_view(), name = 'user-profile'),
    url('^users/password/$', views.UserChangePasswordView.as_view(), name = 'user-password'),

]