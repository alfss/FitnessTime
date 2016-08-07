from django.core.urlresolvers import reverse
from rest_framework import status
from test_tools.common_test_case import AuthenticatedTestCase
from test_tools.factories.training_factory import TrainingFactory


class ExerciseTestCase(AuthenticatedTestCase):
    def setUp(self):
        super(ExerciseTestCase, self).setUp()

    def test_create_exercise(self):
        url = reverse('api-v1:workout:exercise-list')
        training = TrainingFactory(title='TEST', owner=self.user)
        data = {
            'title':'test exercise',
            'priority': 1,
            'repeat': 3,
            'weight': 12.4,
            'rest_time': 31,
            'training': training.uuid
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)