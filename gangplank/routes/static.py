import os

import falcon
import jinja2

from gangplank.config import config


def load_template(name):
    p = os.path.dirname(__file__)
    path = os.path.join(p, '../static/html/', name)
    with open(os.path.abspath(path), 'r') as fp:
        return jinja2.Template(fp.read())


def get_config():
    return {
        'web_host': config.WEB_HOST,
    }


def get_initial_state(context):
    return {
        'user': context.get('user', {}),
    }


def pass_to_frontend(req, resp):
    template = load_template('index.html')

    resp.content_type = 'text/html'
    resp.status = falcon.HTTP_200
    resp.body = template.render(
        config=get_config(),
        initial_state=get_initial_state(req.context)
    )
