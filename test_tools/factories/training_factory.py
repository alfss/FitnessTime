import factory

from test_tools.factories.user_factory import UserFactory
from workout.models import Training

class TrainingFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Training

    title = factory.Sequence(lambda n: "title_training_%d" % n)
    owner = factory.SubFactory(UserFactory)