import { handleError } from '../../api';

import {
  CREATE_EVENT_PENDING,
  DELETE_EVENT_PENDING,
  DELETE_EVENT_COMPLETE,
  FETCH_EVENTS_PENDING,
  FETCH_EVENT_PENDING,
  UPDATE_EVENT_PENDING,
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
    .mergeMap(action =>
      ajax(`/api/events/${action.payload.id}`).map(
        ({ response }) => fetchEventComplete(response),
      ).catch(handleError(fetchEventError)),
    );

const fetchEventsEpic = (action$, store, { ajax }) =>
  action$.ofType(FETCH_EVENTS_PENDING)
    .mergeMap(action =>
      ajax('/api/events').map(
        ({ response }) => fetchEventsComplete(response),
      ).catch(handleError(fetchEventsError)),
    );

const createEventEpic = (action$, store, { ajax, push }) =>
  action$.ofType(CREATE_EVENT_PENDING)
    .mergeMap(action =>
      ajax({
        method: 'POST',
        url: '/api/events',
        body: action.payload,
      }).map(({ response }) =>
        createEventComplete(response),
      ).map(({ payload }) =>
        push(`/events/${payload.id}`),
      ).catch(handleError(createEventError)),
    );

const updateEventEpic = (action$, store, { ajax, push }) =>
  action$.ofType(UPDATE_EVENT_PENDING)
    .mergeMap(action =>
      ajax({
        method: 'PATCH',
        url: `/api/events/${action.payload.id}`,
        body: action.payload,
      }).map(
        ({ response }) => updateEventComplete(response),
      ).map(({ payload }) =>
        push(`/events/${action.payload.id}`),
      ).catch(handleError(updateEventError)),
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
};
