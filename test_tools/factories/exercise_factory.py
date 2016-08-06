import factory
import factory.fuzzy

from test_tools.factories.training_factory import TrainingFactory
from workout.models import Exercise

class ExerciseFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Exercise

    title = factory.Sequence(lambda n: "title_exercise_%d" % n)
    priority = factory.fuzzy.FuzzyInteger(-3, 10)
    repeat = factory.fuzzy.FuzzyInteger(1, 4)
    weight = factory.fuzzy.FuzzyFloat(0.1, 20.7)
    rest_time = factory.fuzzy.FuzzyInteger(10, 60)
    training = factory.SubFactory(TrainingFactory)
