from django.http import HttpResponse
from django.template import loader

def main(request):
    template = loader.get_template('main.html')
    context = {}
    return HttpResponse(template.render(context, request))


def signin(request):
    template = loader.get_template('signin.html')
    context = {}
    return HttpResponse(template.render(context, request))