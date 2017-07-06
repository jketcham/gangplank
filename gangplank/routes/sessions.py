import json
import uuid

import falcon

from graceful.authentication import Token

from gangplank.session import auth_storage
from gangplank.models import User


class Resource(object):
    def on_post(self, req, resp):
        req_content = json.load(req.bounded_stream)
        user = User.get_by_email(req_content['email'])
        if not user:
            raise falcon.HTTPBadRequest('Account not found')

        if not user.check_password(req_content['password']):
            raise falcon.HTTPBadRequest('Incorrect password')

        token_user = {
            'id': str(user.id),
            'name': user.name,
        }
        token = uuid.uuid4().hex

        auth_storage.register(Token(auth_storage), token, token_user)

        resp.body = json.dumps({'token': token})
