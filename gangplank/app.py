import os

import falcon
from mongoengine import connect

from .authentication import JWT
from .routes import users, sessions, events, static, activation, admin_events
from .session import auth_storage
from .config import config


def create_app(config):
    connect(config.get('MONGO_DB'), host=config.get('MONGO_HOST'))

    api = falcon.API(middleware=[JWT(auth_storage)])
    api.add_route('/api/users', users.UsersResource())
    api.add_route('/api/users/{user_id}', users.UserResource())
    api.add_route('/api/events', events.EventsResource())
    api.add_route('/api/events/{event_id}', events.EventResource())
    api.add_route('/api/session', sessions.Resource())
    api.add_route('/api/activations/{activation_code}', activation.ActivationResource())

    api.add_route('/admin/events/{event_id}', admin_events.EventResource())

    # serve frontend
    api.add_sink(static.pass_to_frontend)

    return api


def get_app():
    env = os.environ.get('ENV', 'default')
    config.load_module('config.default')
    config.load_module('config.' + env)
    config.load_env('MAILGUN_PASS')

    return create_app(config)
