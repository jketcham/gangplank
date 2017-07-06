import os
import importlib
import hashlib

from redis import StrictRedis as Redis
from graceful.authentication import KeyValueUserStorage, Token


# TODO: cleanup accessing config
env = os.environ.get('ENV', 'default')
config = importlib.import_module('config.' + env)

auth_storage = KeyValueUserStorage(Redis(host=config.REDIS_HOST))


@auth_storage.hash_identifier.register(Token)
def _(identified_with, identifier):
        return hashlib.sha1(identifier[1].encode()).hexdigest()
