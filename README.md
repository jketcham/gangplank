# gangplank

A web app created for Gangplank Chandler to help organize the space and people in it.

## Pull requests welcome! Look at TODO.md

## Getting started:
 - Requirements:
    - Node.js
    - Python3
    - gulp
    - gunicorn
    - mongodb
 - Run Node front-end (from gangplank/web):
    - `npm install`
    - `gulp watch`
 - Run Python back-end (from gangplank):
    - `python3 -m venv env`
    - `source env/bin/activate`
    - `pip intall -r requirement.txt`
    - `gunicorn -b 0.0.0.0:8080 gangplank.app:get_app()`
 - View web app:
    - Browse to http://localhost:8000/

## Other Dev Notes:
You can create a user, a session, and an event by sending these example JSON strings to the example API endpoints.

Check out Robo 3T for connecting to Mongo and Insomnia for sending requests to the API endpoints.

### JSON Examples:

#### api/users

```
{
    "name": "user",
    "email": "user@example.com",
    "password": "password"
}
```

#### api/session
```
{
    "email": "user@example.com",
    "password": "password"
}
```

#### api/events

```
{
    "name": "test",
    "start_date": "2017-07-15T01:21:06.076Z",
    "description": "Bob"
}
```
