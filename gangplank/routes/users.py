import json

import falcon
import bcrypt

from mongoengine import NotUniqueError

from gangplank.models import User

from .schema.user import CreateUserSchema, UserSchema, UpdateUserSchema


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

        user_schema = UserSchema()
        user_result = user_schema.dump(user)

        resp.body = json.dumps(user_result.data)
        resp.status = falcon.HTTP_201


class UserResource(object):
    def on_get(self, req, resp, user_id):
        user = User.objects(id=user_id).first()

        if user is None:
            raise falcon.HTTP_NOT_FOUND()

        user_schema = UserSchema()
        result = user_schema.dump(user)

        resp.body = json.dumps(result.data)

    def on_put(self, req, resp, user_id):
        user = User.objects(id=user_id).first()

        if user is None:
            raise falcon.HTTP_NOT_FOUND()

        update_schema = UpdateUserSchema()
        result, error = update_schema.dump(json.load(req.bounded_stream))
        if error:
            raise falcon.HTTPBadRequest('Missing data', error)

        for key, value in result.items():
            setattr(user, key, value)
        user.save()

        user_schema = UserSchema()
        user_result = user_schema.dump(user)

        resp.body = json.dumps(user_result.data)
