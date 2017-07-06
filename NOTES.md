# gangplank

### goal

Create a web app for Gangplank Chandler to help organize people and stuff.

### open source stack

- docker
- nginx
- MongoDB
- redis

- python3
- gunicorn
- falcon
- PyMongo

### app resources

- users
- groups/meetups
- events
- rooms (reservations)
- tasks (community tasks and delegation)
- bulletin board (like the literal one in the hallway)

#### models

- user
  - name
  - website
  - bio

- group
  - name
  - description
  - admins/owners
  - moderators (v2?)

- event
  - name
  - description
  - date
  - location
  - owners

- room
  - name
  - location
  - capacity
  - resources (TV, desks/tables, etc)

- reservation
  - room
  - start/end time
  - owner
