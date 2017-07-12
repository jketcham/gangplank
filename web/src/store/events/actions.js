import { createAction } from 'redux-actions';

// TODO: add error action creators

/** fetch event */

const FETCH_EVENT_PENDING = 'FETCH_EVENT_PENDING';
const FETCH_EVENT_COMPLETE = 'FETCH_EVENT_COMPLETE';
const FETCH_EVENT_ERROR = 'FETCH_EVENT_ERROR';

const fetchEvent = createAction(FETCH_EVENT_PENDING);
const fetchEventComplete = createAction(FETCH_EVENT_COMPLETE);


/** fetch events */

const FETCH_EVENTS_PENDING = 'FETCH_EVENTS_PENDING';
const FETCH_EVENTS_COMPLETE = 'FETCH_EVENTS_COMPLETE';
const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';

const fetchEvents = createAction(FETCH_EVENTS_PENDING);
const fetchEventsComplete = createAction(FETCH_EVENTS_COMPLETE);


export {
  FETCH_EVENTS_COMPLETE,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_PENDING,
  FETCH_EVENT_COMPLETE,
  FETCH_EVENT_ERROR,
  FETCH_EVENT_PENDING,
  fetchEvent,
  fetchEventComplete,
  fetchEvents,
  fetchEventsComplete,
};
