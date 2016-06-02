from rest_framework.permissions import SAFE_METHODS, BasePermission

WRITE_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']

class IsOwnerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.method in WRITE_METHODS and obj.is_owner(request.user):
            return True
        return False