import { ajax } from 'rxjs/observable/dom/ajax';

import {
  FETCH_EVENT_PENDING,
  FETCH_EVENTS_PENDING,
  fetchEventComplete,
  fetchEventsComplete,
} from './actions';

// TODO: add error handling

const fetchEventEpic = action$ =>
  action$.ofType(FETCH_EVENT_PENDING)
    .mergeMap(action =>
      ajax.getJSON(`/api/events/${action.payload.id}`).map(
        response => fetchEventComplete(response),
      ));

const fetchEventsEpic = action$ =>
  action$.ofType(FETCH_EVENTS_PENDING)
    .mergeMap(action =>
      ajax.getJSON('/api/events').map(
        response => fetchEventsComplete(response),
      ));


export {
  fetchEventEpic,
  fetchEventsEpic,
};
