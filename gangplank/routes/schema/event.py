from marshmallow import Schema, fields, validate

from .user import EmbeddedUserSchema


class EventSchema(Schema):
    id = fields.String()
    name = fields.String()
    description = fields.String()
    location = fields.String()

    date_created = fields.DateTime()
    start = fields.DateTime()
    end = fields.DateTime()

    subscribed_users = fields.List(fields.String())

    request_promotion = fields.Bool()
    owner = fields.Nested(EmbeddedUserSchema())
    organizers = fields.List(fields.Nested(EmbeddedUserSchema()))


class CreateEventSchema(EventSchema):
    name = fields.String(required=True)
    description = fields.String(required=True)
    start = fields.DateTime(required=True)
    end = fields.DateTime(required=True)
    request_promotion = fields.Bool()


class UpdateEventSchema(EventSchema):
    name = fields.String()
    description = fields.String(validate=[
        validate.Length(max=1000),
    ])
    location = fields.String(validate=[
        validate.Length(max=100),
    ])

    start = fields.DateTime()
    end = fields.DateTime()
    request_promotion = fields.Bool()


class AdminUpdateEventSchema(UpdateEventSchema):
    verified = fields.Bool()
