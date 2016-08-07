from django.core.urlresolvers import reverse

# Create your tests here.
from rest_framework import status

from test_tools.common_test_case import AuthenticatedTestCase
from test_tools.factories.training_factory import TrainingFactory
from test_tools.factories.user_factory import UserFactory


class TrainingTestCase(AuthenticatedTestCase):
    def setUp(self):
        super(TrainingTestCase, self).setUp()
        TrainingFactory()
        self.training = TrainingFactory(title='TEST', owner=self.user)

    def test_get_training_list(self):
        url = reverse('api-v1:workout:training-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['title'], 'TEST')

    def test_get_training_info(self):
        url = reverse('api-v1:workout:training-detail', kwargs={ 'uuid': self.training.uuid} )
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'TEST')

    def test_create_training(self):
        url = reverse('api-v1:workout:training-list')
        data = {
            'title':'test create'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['owner']['uuid'], str(self.user.uuid))

    def test_create_training_anower_owner(self):
        url = reverse('api-v1:workout:training-list')
        user_uuid = UserFactory().uuid
        data = {
            'title':'test create',
            'owner': user_uuid
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['owner']['uuid'], str(self.user.uuid))