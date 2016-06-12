from rest_framework import filters

class AnyCanGetUserByIdFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if not view.action == 'retrieve':
            queryset = queryset.filter(pk=request.user.pk)
        return queryset