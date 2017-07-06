import os
import importlib

import falcon
from mongoengine import connect
from graceful.authentication import Token

from .routes import users, sessions, events
from .session import auth_storage


def create_app(config):
    connect(config.MONGO_DB, host=config.MONGO_HOST)

    api = falcon.API(middleware=[Token(auth_storage)])
    api.add_route('/users', users.UsersResource())
    api.add_route('/users/{user_id}', users.UserResource())
    api.add_route('/events', events.EventsResource())
    api.add_route('/session', sessions.Resource())

    return api


def get_app():
    env = os.environ.get('ENV', 'default')
    config = importlib.import_module('config.' + env)
    return create_app(config)
