from string import Template

from jinja2 import PackageLoader, Environment


def load_template(name):
    env = Environment(loader=PackageLoader('gangplank.templates', 'email'))
    return env.get_template(name)


def generate(email, context):
    subject = Template('Event reminder: $event_name is happening tomorrow')
    text = load_template('event_reminder/text.j2').render(context=context)
    html = load_template('event_reminder/html.j2').render(context=context)
    return (email, subject.substitute(context), text, html)
