from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    id = fields.String()
    name = fields.String()
    email = fields.String()

    bio = fields.String()
    website = fields.String()
    roles = fields.List(fields.String())

    verified = fields.Boolean()
    date_created = fields.DateTime()


class CreateUserSchema(UserSchema):
    email = fields.Email(required=True, validate=[
        validate.Email(),
    ])
    name = fields.String(required=True)
    password = fields.String(required=True)


class UpdateUserSchema(UserSchema):
    name = fields.String()
    bio = fields.String()
    website = fields.String()


class EmbeddedUserSchema(Schema):
    id = fields.String()
    name = fields.String()


class UserJWTSchema(Schema):
    id = fields.String()
    name = fields.String()
    roles = fields.List(fields.String())
