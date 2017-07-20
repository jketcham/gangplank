import json

import falcon

from gangplank.session import auth_storage
from gangplank.models import User

from .schema.user import UserSchema, UserJWTSchema


class Resource(object):
    def on_post(self, req, resp):
        req_content = json.load(req.bounded_stream)
        user = User.get_by_email(req_content['email'])
        if not user:
            raise falcon.HTTPBadRequest('Account not found')

        if not user.check_password(req_content['password']):
            raise falcon.HTTPBadRequest('Incorrect password')

        schema = UserSchema()
        user_result = schema.dump(user)

        payload_schema = UserJWTSchema()
        user_payload = payload_schema.dump(user)
        token = auth_storage.get_auth_token(user_payload.data)

        resp.body = json.dumps({'token': token, 'user': user_result.data})
