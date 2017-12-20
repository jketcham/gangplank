import falcon


def roles_required(*roles):

    @falcon.before
    def authorization_hook(req, resp, resource, uri_kwargs):
        try:
            user = req.context['user']
        except KeyError:
            raise falcon.HTTPForbidden(
                "Forbidden",
                "Could not identify the user"
            )

        # verify all given roles satisfied by context user
        if set(roles) - set(user.roles):
            raise falcon.HTTPForbidden(
                "Forbidden",
                "'{}' role(s) required".format(', '.join(roles))
            )

    return authorization_hook
