"""
Module to setup Celery worker.
"""
from datetime import timedelta

from celery import Celery

from gangplank.config import config

celery = Celery('gangplank')
celery.conf.update(
    BROKER_URL=config.get('BROKER_URL', 'amqp://rabbit'),
    CELERY_ACCEPT_CONTENT=['json'],
    CELERY_TASK_SERIALIZER='json',
    CELERY_IMPORTS=(
        'gangplank.tasks.email',
        'gangplank.tasks.event_reminder',
    ),
    CELERYBEAT_SCHEDULE={
        'send-event-reminders': {
            'task': 'gangplank.tasks.event_reminder.send_event_reminders',
            'schedule': timedelta(hours=1)
        },
    },
)
