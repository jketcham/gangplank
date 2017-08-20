"""
Module to setup Celery worker.
"""

import os

from celery import Celery


celery = Celery('gangplank')
celery.conf.update(
    # Default to using database number 10 so we don't conflict with the session
    # store.
    BROKER_URL=os.environ.get('CELERY_BROKER_URL',
                              os.environ.get('BROKER_URL', 'amqp://rabbit')),
    CELERY_ACCEPT_CONTENT=['json'],
    CELERY_TASK_SERIALIZER='json',
    CELERY_IMPORTS=(
        'gangplank.tasks.email',
    ),
)
