from marshmallow import Schema, fields

from .user import EmbeddedUserSchema


class EventSchema(Schema):
    id = fields.String()
    name = fields.String()
    description = fields.String()
    location = fields.String()

    date_created = fields.DateTime()
    start = fields.DateTime()
    end = fields.DateTime()

    request_promotion = fields.Bool()
    owners = fields.List(fields.Nested(EmbeddedUserSchema()))


class CreateEventSchema(EventSchema):
    name = fields.String(required=True)
    description = fields.String(required=True)
    start = fields.DateTime()
    end = fields.DateTime()
    request_promotion = fields.Bool()


class UpdateEventSchema(EventSchema):
    name = fields.String()
    description = fields.String()
    location = fields.String()

    start = fields.DateTime()
    end = fields.DateTime()
    request_promotion = fields.Bool()
