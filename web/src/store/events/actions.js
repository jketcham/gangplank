import { createAction } from 'redux-actions';


/** fetch event */

const FETCH_EVENT_PENDING = 'FETCH_EVENT_PENDING';
const FETCH_EVENT_COMPLETE = 'FETCH_EVENT_COMPLETE';
const FETCH_EVENT_ERROR = 'FETCH_EVENT_ERROR';

const fetchEvent = createAction(FETCH_EVENT_PENDING);
const fetchEventComplete = createAction(FETCH_EVENT_COMPLETE);
const fetchEventError = createAction(FETCH_EVENT_ERROR);


/** fetch events */

const FETCH_EVENTS_PENDING = 'FETCH_EVENTS_PENDING';
const FETCH_EVENTS_COMPLETE = 'FETCH_EVENTS_COMPLETE';
const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';

const fetchEvents = createAction(FETCH_EVENTS_PENDING);
const fetchEventsComplete = createAction(FETCH_EVENTS_COMPLETE);
const fetchEventsError = createAction(FETCH_EVENTS_ERROR);

/** create event */

const CREATE_EVENT_PENDING = 'CREATE_EVENT_PENDING';
const CREATE_EVENT_COMPLETE = 'CREATE_EVENT_COMPLETE';
const CREATE_EVENT_ERROR = 'CREATE_EVENT_ERROR';

const createEvent = createAction(CREATE_EVENT_PENDING);
const createEventComplete = createAction(CREATE_EVENT_COMPLETE);
const createEventError = createAction(CREATE_EVENT_ERROR);

/** update event */

const UPDATE_EVENT_PENDING = 'UPDATE_EVENT_PENDING';
const UPDATE_EVENT_COMPLETE = 'UPDATE_EVENT_COMPLETE';
const UPDATE_EVENT_ERROR = 'UPDATE_EVENT_ERROR';

const updateEvent = createAction(UPDATE_EVENT_PENDING);
const updateEventComplete = createAction(UPDATE_EVENT_COMPLETE);
const updateEventError = createAction(UPDATE_EVENT_ERROR);

/** delete event */

const DELETE_EVENT_PENDING = 'DELETE_EVENT_PENDING';
const DELETE_EVENT_COMPLETE = 'DELETE_EVENT_COMPLETE';
const DELETE_EVENT_ERROR = 'DELETE_EVENT_ERROR';

const deleteEvent = createAction(DELETE_EVENT_PENDING);
const deleteEventComplete = createAction(DELETE_EVENT_COMPLETE);
const deleteEventError = createAction(DELETE_EVENT_ERROR);

export {
  CREATE_EVENT_COMPLETE,
  CREATE_EVENT_ERROR,
  CREATE_EVENT_PENDING,
  DELETE_EVENT_COMPLETE,
  DELETE_EVENT_ERROR,
  DELETE_EVENT_PENDING,
  FETCH_EVENTS_COMPLETE,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_PENDING,
  FETCH_EVENT_COMPLETE,
  FETCH_EVENT_ERROR,
  FETCH_EVENT_PENDING,
  UPDATE_EVENT_COMPLETE,
  UPDATE_EVENT_ERROR,
  UPDATE_EVENT_PENDING,
  createEvent,
  createEventComplete,
  createEventError,
  deleteEvent,
  deleteEventComplete,
  deleteEventError,
  fetchEvent,
  fetchEventComplete,
  fetchEventError,
  fetchEvents,
  fetchEventsComplete,
  fetchEventsError,
  updateEvent,
  updateEventComplete,
  updateEventError,
};
