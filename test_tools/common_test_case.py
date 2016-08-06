from rest_framework.test import APITestCase

from test_tools.factories.user_factory import UserFactory


class AuthenticatedTestCase(APITestCase):
    def setUp(self):
        self.user_password = 'pass_1'
        self.user_name = 'user_test_1'
        self.user = UserFactory(username=self.user_name, password=self.user_password )
        self.client.force_authenticate(user=self.user)

class AnonymouseTestCase(APITestCase):
    def setUp(self):
        self.user_password = 'pass_1'
        self.user_name = 'user_test_1'
        self.user = UserFactory(username=self.user_name, password=self.user_password )
