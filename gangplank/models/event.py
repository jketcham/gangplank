from datetime import datetime

from mongoengine import (
    BooleanField,
    DateTimeField,
    Document,
    EmbeddedDocumentListField,
    EmbeddedDocumentField,
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

    date_created = DateTimeField(default=datetime.now)
    owner = EmbeddedDocumentField(EmbeddedUser)
    organizers = EmbeddedDocumentListField(EmbeddedUser)
    verified = BooleanField(default=False)

    def is_owner(self, user_id):
        return user_id == self.owner.id

    def verified_events(doc_cls, queryset):
        return queryset.filter(verified=True)
