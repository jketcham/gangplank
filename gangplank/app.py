import falcon
from mongoengine import connect
from graceful.authentication import Token

from .routes import users, sessions, events, static
from .session import auth_storage
from .config import config


def create_app(config):
    connect(config.MONGO_DB, host=config.MONGO_HOST)

    api = falcon.API(middleware=[Token(auth_storage)])
    api.add_route('/api/users', users.UsersResource())
    api.add_route('/api/users/{user_id}', users.UserResource())
    api.add_route('/api/events', events.EventsResource())
    api.add_route('/api/session', sessions.Resource())

    # serve frontend
    api.add_sink(static.pass_to_frontend)

    return api


def get_app():
    return create_app(config)
