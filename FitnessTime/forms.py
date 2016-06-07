from django import forms
from django.contrib.auth.forms import AuthenticationForm

__author__ = 'Sergey Kravchuk'

class SiginForm(AuthenticationForm):
    # next = forms.CharField(widget=forms.HiddenInput())

    def __init__(self, *args, **kwargs):
        super(SiginForm, self).__init__(*args,**kwargs)
        self.fields['username'].widget.attrs.update({'class':'form-control','placeholder':'Username'})
        self.fields['password'].widget.attrs.update({'class':'form-control','placeholder':'Password'})
