import json

import falcon
from mongoengine.errors import ValidationError
from graceful.resources.base import BaseResource

from gangplank.authorization import roles_required
from gangplank.models import Event

from .schema.event import (
    EventSchema,
    AdminUpdateEventSchema,
)


@roles_required('admin')
class EventResource(BaseResource):
    def on_get(self, req, resp, event_id):
        event = Event.objects(id=event_id).first()

        if not event:
            raise falcon.HTTPNotFound()

        # event_schema = EventSchema()
        # result = event_schema.dump(event)

        resp.body = json.dumps(event)

    def on_patch(self, req, resp, event_id):
        event = Event.objects(id=event_id).first()

        if not event:
            raise falcon.HTTPNotFound()

        update_schema = AdminUpdateEventSchema()
        result, error = update_schema.load(json.load(req.bounded_stream))
        if error:
            raise falcon.HTTPBadRequest('Missing data', error)

        for key, value in result.items():
            setattr(event, key, value)

        try:
            event.save()
        except ValidationError as err:
            raise falcon.HTTPBadRequest('Invalid data', err.to_dict())

        event_schema = EventSchema()
        event_result = event_schema.dump(event)

        resp.body = json.dumps(event_result.data)


@roles_required('admin')
class EventsResource(object):
    pass
