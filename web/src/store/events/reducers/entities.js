import _ from 'lodash';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import {
  FETCH_EVENTS_COMPLETE,
  FETCH_EVENT_PENDING,
  FETCH_EVENT_COMPLETE,
  FETCH_EVENT_ERROR,
  CREATE_EVENT_COMPLETE,
} from '../actions';


const INITIAL_STATE = new Immutable.OrderedMap();
const EVENT_INITIAL_STATE = new Immutable.Map({
  loading: false,
  error: new Immutable.Map(),
});


const handleFetchEventComplete = (state, { payload }) =>
  state.set(payload.id, Immutable.fromJS(payload));

const handleFetchEventError = (state, { payload }) =>
  state.set(payload.id, EVENT_INITIAL_STATE.set('error', payload.error));

const handleFetchEventPending = (state, { payload }) =>
  state.set(payload.id, EVENT_INITIAL_STATE.set('loading', true));

const handleFetchEventsComplete = (state, { payload }) =>
  state.mergeDeep(_.keyBy(payload.results, 'id'));

const handleEventCreate = (state, { payload }) =>
  state.set(payload.id, Immutable.fromJS(payload));


export default createReducer(INITIAL_STATE, {
  [CREATE_EVENT_COMPLETE]: handleEventCreate,
  [FETCH_EVENT_PENDING]: handleFetchEventPending,
  [FETCH_EVENT_COMPLETE]: handleFetchEventComplete,
  [FETCH_EVENT_ERROR]: handleFetchEventError,
  [FETCH_EVENTS_COMPLETE]: handleFetchEventsComplete,
});
