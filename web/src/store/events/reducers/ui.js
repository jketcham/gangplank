import _ from 'lodash';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import {
  CREATE_EVENT_ERROR,
  UPDATE_EVENT_ERROR,
  UPDATE_EVENT_COMPLETE,
  FETCH_EVENTS_COMPLETE,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_PENDING,
  FETCH_EVENT_ERROR,
  FETCH_EVENT_PENDING,
  FETCH_EVENT_COMPLETE,
} from '../actions';


const INITIAL_STATE = new Immutable.Map({
  events: new Immutable.Map(),
  loading: false,
  errors: new Immutable.Map({ title: '', description: new Immutable.Map() }),
});


const handleFetchEventPending = (state, action) =>
  state.set('loading', true);

const handleFetchEventError = (state, { payload: error }) =>
  state.merge({
    loading: false,
    error,
  });

const handleFetchEventsPending = (state, action) =>
  state.set('loading', true);

const handleFetchEventComplete = (state, action) =>
  state.set('loading', false);

const handleFetchEventsComplete = (state, { payload }) =>
  state.merge({
    loading: false,
    error: false,
    results: _.map(payload.results, 'id'),
  });

const handleFetchEventsError = (state, { payload: error }) =>
  state.merge({
    loading: false,
    error,
  });

const handleEventError = (state, { payload }) =>
  state.set('errors', Immutable.fromJS(payload.errors));

const handleEventUpdateComplete = (state, { payload }) =>
  state.set('errors', INITIAL_STATE.get('errors'));


export default createReducer(INITIAL_STATE, {
  [CREATE_EVENT_ERROR]: handleEventError,
  [UPDATE_EVENT_ERROR]: handleEventError,
  [UPDATE_EVENT_COMPLETE]: handleEventUpdateComplete,
  [FETCH_EVENT_PENDING]: handleFetchEventPending,
  [FETCH_EVENT_ERROR]: handleFetchEventError,
  [FETCH_EVENT_COMPLETE]: handleFetchEventComplete,
  [FETCH_EVENTS_PENDING]: handleFetchEventsPending,
  [FETCH_EVENTS_COMPLETE]: handleFetchEventsComplete,
  [FETCH_EVENTS_ERROR]: handleFetchEventsError,
});
