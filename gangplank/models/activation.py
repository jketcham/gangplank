import datetime
import random
import hashlib
import string

from mongoengine import (
    Document,
    DateTimeField,
    StringField,
    ObjectIdField,
)


def _generate_code(length=12):
    msg = hashlib.sha256()
    word = ''
    for _ in range(length):
        word += random.choice(string.ascii_letters)
    msg.update(word.encode('ascii'))
    return str(msg.hexdigest()[:length])


class Activation(Document):
    meta = {
        'collections': 'activation_codes',
    }

    user = ObjectIdField(required=True)
    code = StringField(required=True, null=False, default=_generate_code())
    date_created = DateTimeField(default=datetime.datetime.now)

    @classmethod
    def get_by_code(self, code):
        return self.objects(code=code).first()
