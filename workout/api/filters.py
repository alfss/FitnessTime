from rest_framework import filters

class AnyCanGetTraningByIdFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if not view.action == 'retrieve':
            queryset = queryset.filter(owner=request.user.pk)
        return queryset