from gangplank.config import config
from gangplank.models import User
from gangplank.authentication import JWTAuthStorage


secret = config.get('GP_SECRET', 'not_a_secret')


def user_loader(payload):
    user = User.objects(id=payload['user']['id']).first()
    return user


auth_storage = JWTAuthStorage(user_loader, secret)
