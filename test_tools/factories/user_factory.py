import factory

from common.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: "user_%d" % n)
    email = factory.Sequence(lambda n: "email_%d@fakedomain.local" % n)
    first_name = factory.Sequence(lambda n: "Billi_%d" % n)
    last_name = factory.Sequence(lambda n: "Jons_%d" % n)


    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        """Override the default ``_create`` with our custom call."""
        manager = cls._get_manager(model_class)
        # The default would use ``manager.create(*args, **kwargs)``
        return manager.create_user(*args, **kwargs)