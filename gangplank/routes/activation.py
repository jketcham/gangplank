import falcon

from gangplank.models import Activation, User


class ActivationResource(object):
    def on_get(self, req, resp, activation_code):
        activation = Activation.get_by_code(activation_code)

        if not activation:
            raise falcon.HTTPNotFound()

        user = User.objects(id=activation.user).first()
        user.email_verified = True
        user.save()
