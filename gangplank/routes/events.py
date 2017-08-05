import json
from datetime import datetime

import falcon
from mongoengine.errors import ValidationError

from gangplank.models import Event
from graceful.authorization import authentication_required

from .schema.event import EventSchema, CreateEventSchema, UpdateEventSchema


class EventResource(object):
    def on_get(self, req, resp, event_id):
        event = Event.objects(id=event_id).first()

        if not event:
            raise falcon.HTTPNotFound()

        event_schema = EventSchema()
        result = event_schema.dump(event)

        resp.body = json.dumps(result.data)

    @authentication_required
    def on_patch(self, req, resp, event_id):
        event = Event.objects(id=event_id).first()

        if not event:
            raise falcon.HTTPNotFound()

        if not event.is_owner(req.context['user'].id):
            raise falcon.HTTPForbidden()

        update_schema = UpdateEventSchema()
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

    @authentication_required
    def on_delete(self, req, resp, event_id):
        event = Event.objects(id=event_id).first()

        if not event:
            raise falcon.HTTPNotFound()

        if not event.is_owner(req.context['user'].id):
            raise falcon.HTTPForbidden()

        event.delete()
        resp.status = falcon.HTTP_204


class EventsResource(object):
    def on_get(self, req, resp):
        events = Event.objects(start__gte=datetime.now()).order_by('start')

        event_schema = EventSchema(many=True)
        result = event_schema.dump(events)

        resp.body = json.dumps({'results': result.data})

    @authentication_required
    def on_post(self, req, resp):
        create_schema = CreateEventSchema()
        data, errors = create_schema.load(json.load(req.bounded_stream))
        if errors:
            raise falcon.HTTPBadRequest('Missing data', errors)

        context_user = {
            'id': req.context['user']['id'],
            'name': req.context['user']['name'],
        }

        event = Event(
            owner=context_user,
        )

        for key, value in data.items():
            setattr(event, key, value)

        try:
            event.save()
        except ValidationError as err:
            raise falcon.HTTPBadRequest('Invalid data', err.to_dict())

        event_schema = EventSchema()
        event_result = event_schema.dump(event)

        resp.body = json.dumps(event_result.data)
        resp.status = falcon.HTTP_201
