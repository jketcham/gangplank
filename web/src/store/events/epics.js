import { Observable } from 'rxjs';

import { handleError } from '../../api';

import { EventsURI, EventURI } from '../../uris/api/events';
import {
  CREATE_EVENT_PENDING,
  DELETE_EVENT_PENDING,
  DELETE_EVENT_COMPLETE,
  FETCH_EVENTS_PENDING,
  FETCH_EVENT_PENDING,
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_COMPLETE,
  createEventComplete,
  createEventError,
  deleteEventComplete,
  deleteEventError,
  fetchEventComplete,
  fetchEventError,
  fetchEventsComplete,
  fetchEventsError,
  updateEventComplete,
  updateEventError,
} from './actions';


const fetchEventEpic = (action$, store, { ajax }) =>
  action$.ofType(FETCH_EVENT_PENDING)
    .mergeMap(({ payload }) =>
      ajax(EventURI.expand(payload)).map(
        ({ response }) => fetchEventComplete(response),
      ).catch(handleError(fetchEventError)),
    );

const fetchEventsEpic = (action$, store, { ajax }) =>
  action$.ofType(FETCH_EVENTS_PENDING)
    .mergeMap(({ payload }) =>
      ajax(EventsURI.expand(payload.query)).map(
        ({ response }) => fetchEventsComplete(response),
      ).catch(handleError(fetchEventsError)),
    );

const createEventEpic = (action$, store, { ajax, push }) =>
  action$.ofType(CREATE_EVENT_PENDING)
    .mergeMap(({ payload }) =>
      ajax({
        method: 'POST',
        url: '/api/events',
        body: payload,
      }).map(({ response }) =>
        createEventComplete(response),
      ).map(action =>
        push(`/events/${action.payload.id}`),
      ).catch(handleError(createEventError)),
    );

const updateEventEpic = (action$, store, { ajax, push }) =>
  action$.ofType(UPDATE_EVENT_PENDING)
    .mergeMap(({ payload }) =>
      ajax({
        method: 'PATCH',
        url: `/api/events/${payload.id}`,
        body: payload,
      }).map(
        ({ response }) => updateEventComplete(response),
      ).catch(handleError(updateEventError)),
    );

const updateEventNavigateEpic = (action$, store, { push }) =>
  action$.ofType(UPDATE_EVENT_COMPLETE)
    .mergeMap(({ payload }) =>
      Observable.of(push(`/events/${payload.id}`)),
    );

const deleteEventEpic = (action$, store, { ajax }) =>
  action$.ofType(DELETE_EVENT_PENDING)
    .mergeMap(action =>
      ajax({
        method: 'DELETE',
        url: `/api/events/${action.payload.id}`,
      }).map(
        ({ response }) => deleteEventComplete({ id: action.payload.id }),
      ).catch(handleError(deleteEventError)),
    );

const deleteEventNavigateEpic = (action$, store, { push }) =>
  action$.ofType(DELETE_EVENT_COMPLETE)
    .mapTo(push('/events'));


export {
  createEventEpic,
  deleteEventEpic,
  deleteEventNavigateEpic,
  fetchEventEpic,
  fetchEventsEpic,
  updateEventEpic,
  updateEventNavigateEpic,
};
