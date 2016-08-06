from rest_framework.test import APITestCase

from test_tools.factories.user_factory import UserFactory

class BasicAuthTestCase(APITestCase):
    def setUp(self):
        self.user_password = 'testpassword'
        self.user_name = 'testauthuser'
        self.user = UserFactory(username=self.user_name, password=self.user_password )

    def test_basic_auth(self):
        self.assertTrue(self.client.login(username=self.user_name, password=self.user_password ))
        self.client.logout()