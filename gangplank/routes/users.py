import json

import falcon
import bcrypt

from mongoengine import NotUniqueError, ValidationError
from graceful.authorization import authentication_required

from gangplank.tasks.email import send
from gangplank.emails import user_join
from gangplank.models import User, Activation
from gangplank.session import auth_storage
from gangplank.config import config

from .schema.user import CreateUserSchema, UserSchema, UpdateUserSchema, UserJWTSchema


class UsersResource(object):
    def on_get(self, req, resp):
        users = User.objects

        user_schema = UserSchema(many=True)
        result = user_schema.dump(users)

        resp.body = json.dumps({'results': result.data})

    def on_post(self, req, resp):
        create_schema = CreateUserSchema()
        result, error = create_schema.load(json.load(req.bounded_stream))
        if error:
            raise falcon.HTTPBadRequest('Missing data', error)

        password = result['email'] + result['password']
        password_hash = bcrypt.hashpw(
            password.encode('utf8'),
            bcrypt.gensalt()
        )

        try:
            user = User(
                name=result['name'],
                email=result['email'],
                pw_hash=password_hash,
            ).save()
        except NotUniqueError:
            raise falcon.HTTPBadRequest('Account already exists')

        activation = Activation(user=user.id)
        activation.save()

        context = {
            'name': result['name'],
            'activation_link': '{}/api/activations/{}'.format(config['HOST'], activation.code),
        }
        recipient = '{} <{}>'.format(result['name'], result['email'])
        send.delay(
            *user_join.generate(recipient, context),
            mailgun_pass=config.get('MAILGUN_PASS')
        )

        user_schema = UserSchema()
        user_result = user_schema.dump(user)

        payload_schema = UserJWTSchema()
        user_payload = payload_schema.dump(user)
        token = auth_storage.get_auth_token(user_payload.data)

        resp.body = json.dumps({'token': token, 'user': user_result.data})
        resp.status = falcon.HTTP_201


class UserResource(object):
    def on_get(self, req, resp, user_id):
        user = User.objects(id=user_id).first()

        if user is None:
            raise falcon.HTTP_NOT_FOUND()

        user_schema = UserSchema()
        result = user_schema.dump(user)

        resp.body = json.dumps(result.data)

    @authentication_required
    def on_patch(self, req, resp, user_id):
        if str(req.context['user'].id) != str(user_id):
            raise falcon.HTTPForbidden()

        user = User.objects(id=user_id).first()

        if user is None:
            raise falcon.HTTP_NOT_FOUND()

        update_schema = UpdateUserSchema()
        result, error = update_schema.dump(json.load(req.bounded_stream))
        if error:
            raise falcon.HTTPBadRequest('Missing data', error)

        for key, value in result.items():
            setattr(user, key, value)

        try:
            user.save()
        except ValidationError as err:
            raise falcon.HTTPBadRequest('Invalid data', err.to_dict())

        user_schema = UserSchema()
        user_result = user_schema.dump(user)

        resp.body = json.dumps(user_result.data)
