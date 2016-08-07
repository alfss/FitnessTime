from django.core.urlresolvers import reverse

from rest_framework import status

from test_tools.common_test_case import AnonymouseTestCase
from test_tools.factories.exercise_factory import ExerciseFactory
from test_tools.factories.training_factory import TrainingFactory


class TrainingAnonymouseTestCase(AnonymouseTestCase):
    def setUp(self):
        super(TrainingAnonymouseTestCase, self).setUp()
        self.training = TrainingFactory(title='TEST', owner=self.user)
        ExerciseFactory.create_batch(4, training=self.training)

    def test_get_training_list(self):
        url = reverse('api-v1:workout:training-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 0)

    def test_get_training_info(self):
        url = reverse('api-v1:workout:training-detail', kwargs={ 'uuid': self.training.uuid} )
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'TEST')
        with self.assertRaises(KeyError):
            response.data['owner']['email']

    def test_create_training(self):
        url = reverse('api-v1:workout:training-list')
        data = {
            'title':'test create'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)