from datetime import datetime

from mongoengine import (
    BooleanField,
    DateTimeField,
    Document,
    EmbeddedDocumentListField,
    StringField,
)

from .user import EmbeddedUser


class Event(Document):
    meta = {
        'collection': 'events',
        'indexes': [
            {
                'fields': ['start'],
                'unique': True,
            },
        ],
    }

    name = StringField(required=True)
    location = StringField()
    description = StringField(max_length=1000)

    start = DateTimeField(required=True)
    end = DateTimeField(required=True)

    request_promotion = BooleanField()

    date_created = DateTimeField(defautl=datetime.now)
    owners = EmbeddedDocumentListField(EmbeddedUser)

    def is_owner(self, user_id):
        return any(user['id'] == user_id for user in self.owners)
