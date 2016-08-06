from django.core.urlresolvers import reverse
from rest_framework import status

from test_tools.common_test_case import AnonymouseTestCase


class UserTestAnonymouseTastCase(AnonymouseTestCase):
    def setUp(self):
        super(UserTestAnonymouseTastCase, self).setUp()

    def test_get_user_list(self):
        url = reverse('api-v1:common:user-list')
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 0)

    def test_get_user_info(self):
        url = reverse('api-v1:common:user-detail', kwargs={ 'uuid': self.user.uuid })
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)

    def test_update_user_info(self):
        url = reverse('api-v1:common:user-detail', kwargs={ 'uuid': self.user.uuid })
        response = self.client.patch(url, {'username': 'lalalalal'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)