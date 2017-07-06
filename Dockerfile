from python:3.6.1-alpine

WORKDIR /usr/src/app

COPY requirements.txt ./

# install additional deps on top of alpine required by bcrypt
# TODO: remove these deps after bcrypt installed to create smaller image
RUN apk add --no-cache gcc libffi libffi-dev libc-dev

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV ENV=docker

EXPOSE 8000

CMD ["/usr/local/bin/gunicorn", "-b", "0.0.0.0:8000", "gangplank.app:get_app()"]
