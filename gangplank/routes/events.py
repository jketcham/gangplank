import json

import falcon
from mongoengine.errors import ValidationError
from graceful.parameters import StringParam
from graceful.authorization import authentication_required
from graceful.resources.generic import ListResource
from graceful.resources.mixins import PaginatedMixin

from gangplank.models import Event

from .schema.event import (
    EventSchema,
    CreateEventSchema,
    UpdateEventSchema,
)


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


def make_queryset(params):
    query_args = {}

    for key, value in params.items():
        if value:
            query_args[key] = value

    return query_args


class EventsResource(ListResource, PaginatedMixin):
    owner = StringParam('owner id of events')
    start_gt = StringParam('minimum date of event start')
    start_lt = StringParam('maximum date of event\'s start')
    order = StringParam('field to order events by', 'start')

    def list(self, params, meta):
        query = {
            'owner__id': params.get('owner'),
            'start__gt': params.get('start_gt'),
            'start__lt': params.get('start_lt'),
        }

        events = Event.verified_events(**make_queryset(query)).order_by(params.get('order'))
        paginated_events = events.skip(
            params['page'] * params['page_size']
        ).limit(params['page_size'])

        if events.count() > (params['page'] + 1) * params['page_size']:
            meta['has_more'] = True
        else:
            meta['has_more'] = False

        event_schema = EventSchema(many=True)
        result = event_schema.dump(paginated_events)

        self.add_pagination_meta(params, meta)

        return result.data

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
