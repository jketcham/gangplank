from datetime import datetime

from mongoengine import (
    DateTimeField,
    Document,
    EmbeddedDocumentField,
    StringField,
)

from .user import EmbeddedUser


class Event(Document):
    name = StringField(required=True)
    start_date = DateTimeField(required=True)
    location = StringField()
    description = StringField(max_length=1000)
    end_date = DateTimeField()
    created_date = DateTimeField(defautl=datetime.now)
    creator = EmbeddedDocumentField(EmbeddedUser)
