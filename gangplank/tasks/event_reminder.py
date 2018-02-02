"""
Send out event reminder emails.
"""
from datetime import date, timedelta

from mongoengine import connect

from gangplank.tasks.email import send
from gangplank.emails import event_reminder
from gangplank.models import Event
from gangplank.celery import celery
from gangplank.config import config


@celery.task(bind=True)
def send_event_reminders(self, **kwargs):
    # TODO: improve setting up config for this task
    config.load_env('MAILGUN_PASS')
    connect('gangplank', host='mongo')
    tomorrow = date.today() + timedelta(days=1)

    events = Event.objects.filter(start__gt=tomorrow, start__lt=tomorrow + timedelta(days=1))
    for event in events:
        for user in event.get_subscribed_users():
            context = {
                'user_name': user.name,
                'event_name': event.name,
                'event_start': event.start,
                'event_end': event.end,
                'event_link': '{}/events/{}'.format('http://localhost:8000', event.id),
            }
            recipient = '{} <{}>'.format(user.name, user.email)
            send.delay(
                *event_reminder.generate(recipient, context),
                mailgun_pass=config.get('MAILGUN_PASS')
            )
