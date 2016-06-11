from django.contrib import admin
from django.utils.translation import ugettext, ugettext_lazy as _

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from common.models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('email', 'uuid', 'first_name', 'last_name', 'is_active', 'date_joined', 'is_staff')
    readonly_fields = ('uuid', )
    fieldsets = (
        (None, {'fields': ('uuid', 'username', 'password', )}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
