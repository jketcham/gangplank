from marshmallow import Schema, fields


class EventSchema(Schema):
    id = fields.String()
    name = fields.String()
    description = fields.String()
    location = fields.String()

    date_created = fields.DateTime()
    start_date = fields.DateTime()
    end_date = fields.DateTime()


class CreateEventSchema(EventSchema):
    name = fields.String(required=True)
    start_date = fields.DateTime(require=True)


class UpdateEventSchema(EventSchema):
    name = fields.String()
    description = fields.String()
    location = fields.String()

    start_date = fields.DateTime()
    end_date = fields.DateTime()
