from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    id = fields.String()
    name = fields.String()
    email = fields.String()

    bio = fields.String()
    website = fields.Url()
    roles = fields.List(fields.String())

    verified = fields.Boolean()
    date_created = fields.DateTime()


class CreateUserSchema(UserSchema):
    email = fields.Email(required=True, validate=[
        validate.Email(),
    ])
    name = fields.String(required=True, validate=[
        validate.Length(max=100),
    ])
    password = fields.String(required=True, validate=[
        validate.Length(max=100),
    ])


class UpdateUserSchema(UserSchema):
    name = fields.String(required=True)
    bio = fields.String(validate=[
        validate.Length(max=300),
    ])
    website = fields.Url(validate=[
        validate.URL(relative=False),
    ])


class EmbeddedUserSchema(Schema):
    id = fields.String()
    name = fields.String()


class UserJWTSchema(Schema):
    id = fields.String()
    name = fields.String()
    roles = fields.List(fields.String())
