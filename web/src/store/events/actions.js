import { createAction } from 'redux-actions';

// TODO: add error action creators

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

export {
  CREATE_EVENT_COMPLETE,
  CREATE_EVENT_ERROR,
  CREATE_EVENT_PENDING,
  FETCH_EVENTS_COMPLETE,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_PENDING,
  FETCH_EVENT_COMPLETE,
  FETCH_EVENT_ERROR,
  FETCH_EVENT_PENDING,
  createEvent,
  createEventComplete,
  createEventError,
  fetchEvent,
  fetchEventComplete,
  fetchEventError,
  fetchEvents,
  fetchEventsComplete,
  fetchEventsError,
};
