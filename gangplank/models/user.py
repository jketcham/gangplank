import bcrypt

from datetime import datetime

from mongoengine import (
    BooleanField,
    DateTimeField,
    Document,
    EmailField,
    EmbeddedDocument,
    ListField,
    ObjectIdField,
    StringField,
    URLField,
)


class User(Document):
    meta = {
        'collection': 'users',
    }

    email = EmailField(required=True, unique=True)
    name = StringField(required=True, max_length=100)
    bio = StringField(max_length=300)
    website = URLField()

    roles = ListField(StringField())

    email_verified = BooleanField(default=False)  # TODO: could add this as a role?
    pw_hash = StringField(required=True)
    date_created = DateTimeField(default=datetime.now)

    def add_roles(self, roles):
        self.roles.append(roles)
        self.save()

    def remove_roles(self, roles):
        self.roles.pull_all(roles)
        self.save()

    def check_password(self, password):
        if not password:
            return False

        # TODO: make password comparison time safe
        pw = self.email + password
        return bcrypt.checkpw(pw.encode('utf8'), self.pw_hash.encode('utf8'))

    def set_password(self, current_pw, pw):
        if not self.check_password(self.email + current_pw):
            return False

        pw = self.email + pw
        pw_hash = bcrypt.hashpw(pw.encode('utf8'), bcrypt.gensalt())
        self.pw_hash = pw_hash

    @classmethod
    def get_by_email(self, email):
        return self.objects(email=email).first()


class EmbeddedUser(EmbeddedDocument):
    id = ObjectIdField(required=True)
    name = StringField(required=True)

    def get(self):
        from gangplank.models import User
        return User.objects(id=self.id)
