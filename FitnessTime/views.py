from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response, render
from django.template import loader
from django.contrib import auth

def main(request):
    template = loader.get_template('main.html')
    context = {}
    return HttpResponse(template.render(context, request))


@login_required
def app(request):
    template = loader.get_template('app.html')
    context = {}
    return HttpResponse(template.render(context, request))


def register(request):
    userForm = UserCreationForm(data=request.POST or None)
    if request.method == 'POST' and userForm.is_valid():
        userData = userForm.cleaned_data
        #save
        userForm.save()
        #sigin
        user = authenticate( username = userData['username'], password = userData['password1'] )
        login(request, user)

        return HttpResponseRedirect(reverse('main-app'))
    return render(request, 'registration/register.html', {'form': userForm})

def logout(request):
    auth.logout(request)
    return HttpResponseRedirect("/signin")