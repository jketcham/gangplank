from jinja2 import PackageLoader, Environment


def load_template(name):
    env = Environment(loader=PackageLoader('gangplank.templates', 'email'))
    return env.get_template(name)


def generate(email, context):
    subject = 'Welcome to gangplank chandler! Please confirm your email'
    text = load_template('user_join/text.j2').render(context=context)
    html = load_template('user_join/html.j2').render(context=context)
    return (email, subject, text, html)
