from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
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

def signin(request):
    next_page = request.GET.get('next', '')
    template = loader.get_template('signin.html')
    context = {'next_page': next_page }
    return HttpResponse(template.render(context, request))


def signin_post(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            if request.POST.get('next_page'):
                return HttpResponseRedirect(request.POST.get('next_page'))
            return HttpResponseRedirect('/app/')
        else:
            return HttpResponseRedirect("/signin")
    else:
        return HttpResponseRedirect("/signin")

def logout(request):
    auth.logout(request)
    return HttpResponseRedirect("/signin")