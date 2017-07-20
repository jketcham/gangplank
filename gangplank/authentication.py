from datetime import timedelta, datetime, date, time
import json

from falcon import HTTPBadRequest, HTTPUnauthorized
import jwt
from jwt import InvalidTokenError

from graceful.authentication import BaseUserStorage, BaseAuthenticationMiddleware


class ExtendedJSONEncoder(json.JSONEncoder):
    """
    A JSON encoder that allows for more common Python data types.
    In addition to the defaults handled by ``json``, this also supports:
        * ``datetime.datetime``
        * ``datetime.date``
        * ``datetime.time``
    """
    def default(self, data):
        if isinstance(data, (datetime, date, time)):
            return data.isoformat('T')
        else:
            return super(ExtendedJSONEncoder, self).default(data)


class JWTAuthStorage(BaseUserStorage):
    def __init__(self, user_loader, secret_key,
                 algorithm='HS256', leeway=0,
                 expiration_delta=24 * 60 * 60,
                 audience=None, issuer=None,
                 verify_claims=None, required_claims=None):

        self.user_loader = user_loader
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.leeway = timedelta(seconds=leeway)
        self.expiration_delta = timedelta(seconds=expiration_delta)
        self.audience = audience
        self.issuer = issuer
        self.verify_claims = verify_claims or ['signature', 'exp', 'nbf', 'iat']
        self.required_claims = required_claims or ['exp', 'iat', 'nbf']

        if 'aud' in self.verify_claims and not audience:
            raise ValueError('Audience parameter must be provided if '
                             '`aud` claim needs to be verified')

        if 'iss' in self.verify_claims and not issuer:
            raise ValueError('Issuer parameter must be provided if '
                             '`iss` claim needs to be verified')

    def _decode_jwt_token(self, token):
        options = dict(('verify_' + claim, True) for claim in self.verify_claims)

        options.update(
            dict(('require_' + claim, True) for claim in self.required_claims)
        )

        try:
            payload = jwt.decode(jwt=token, key=self.secret_key,
                                 options=options,
                                 algorithms=[self.algorithm],
                                 issuer=self.issuer,
                                 audience=self.audience,
                                 leeway=self.leeway)
        except InvalidTokenError as ex:
            raise HTTPUnauthorized(
                title='401 Unauthorized',
                description=str(ex),
                challenges=None)

        return payload

    def get_user(self, identified_with, identifier, req, resp, resource, uri_kwargs):
        payload = self._decode_jwt_token(identifier)
        return self.user_loader(payload)

    def get_auth_token(self, user_payload):
        """
        Create a JWT authentication token from ``user_payload``
        Args:
            user_payload(dict, required): A `dict` containing required information
                to create authentication token
        """
        now = datetime.utcnow()
        payload = {
            'user': user_payload
        }
        if 'iat' in self.verify_claims:
            payload['iat'] = now

        if 'nbf' in self.verify_claims:
            payload['nbf'] = now + self.leeway

        if 'exp' in self.verify_claims:
            payload['exp'] = now + self.expiration_delta

        return jwt.encode(payload, self.secret_key,
                          json_encoder=ExtendedJSONEncoder).decode('utf-8')


class JWT(BaseAuthenticationMiddleware):
    """Authenticate user using JSON Web Token authentication.
    Token authentication takes form of ``Authorization`` header::
        Authorization: JWT <token_value>
    Where ``<token_value>`` is a JSON Web Token.
    If client fails to authenticate on protected endpoint the response will
    include following challenge::
        WWW-Authenticate: JWT
    """

    challenge = 'JWT'
    only_with_storage = False

    def identify(self, req, resp, resource, uri_kwargs):
        """Identify user using Authenticate header with Token auth."""
        header = req.get_header('Authorization', False)
        auth = header.split(' ') if header else None

        if auth is None or auth[0].lower() != 'jwt':
            return None

        if len(auth) != 2:
            raise HTTPBadRequest(
                "Invalid Authorization header",
                "The Authorization header for JWT auth should be in form:\n"
                "Authorization: JWT <token_value>"
            )

        return auth[1]
