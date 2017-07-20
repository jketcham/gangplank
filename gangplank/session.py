import os
import importlib

from gangplank.models import User
from gangplank.authentication import JWTAuthStorage


# TODO: cleanup accessing config
env = os.environ.get('ENV', 'default')
secret = os.environ.get('GP_SECRET', 'not_a_secret')
config = importlib.import_module('config.' + env)


def user_loader(payload):
    user = User.objects(id=payload['user']['id']).first()
    return user


auth_storage = JWTAuthStorage(user_loader, secret)
