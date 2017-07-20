import { Observable } from 'rxjs';

import { ajax } from '../../api';

import {
  CREATE_EVENT_PENDING,
  FETCH_EVENTS_PENDING,
  FETCH_EVENT_PENDING,
  createEventComplete,
  createEventError,
  fetchEventComplete,
  fetchEventError,
  fetchEventsComplete,
  fetchEventsError,
} from './actions';


const fetchEventEpic = action$ =>
  action$.ofType(FETCH_EVENT_PENDING)
    .mergeMap(action =>
      ajax(`/api/events/${action.payload.id}`).map(
        ({ response }) => fetchEventComplete(response),
      ),
    ).catch(error => Observable.of(fetchEventError(error)));

const fetchEventsEpic = action$ =>
  action$.ofType(FETCH_EVENTS_PENDING)
    .mergeMap(action =>
      ajax('/api/events').map(
        ({ response }) => fetchEventsComplete(response),
      ),
    ).catch(error => Observable.of(fetchEventsError(error)));

const createEventEpic = action$ =>
  action$.ofType(CREATE_EVENT_PENDING)
    .mergeMap(action =>
      ajax({
        method: 'POST',
        url: '/api/events',
        body: action.payload,
      }).map(
        ({ response }) => createEventComplete(response),
      ),
    ).catch(error => Observable.of(createEventError(error)));


export {
  createEventEpic,
  fetchEventEpic,
  fetchEventsEpic,
};
