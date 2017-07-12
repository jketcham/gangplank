import _ from 'lodash';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import {
  FETCH_EVENTS_PENDING,
  FETCH_EVENTS_COMPLETE,
  FETCH_EVENTS_ERROR,
  FETCH_EVENT_PENDING,
  FETCH_EVENT_COMPLETE,
  FETCH_EVENT_ERROR,
} from './actions';


// TODO: update this state shape, should separate into entities and ui reducer,
//       with the entities reducer being just a map of id's to events
const INITIAL_STATE = new Immutable.Map({
  results: new Immutable.Map(),
  loading: false,
  error: null,
});


const handleFetchEventPending = (state, action) =>
  state.set('loading', true);

const handleFetchEventComplete = (state, { payload }) =>
  state
    .set('loading', false)
    .setIn(['results', payload.id], Immutable.fromJS(payload));

const handleFetchEventError = (state, { payload: error }) =>
  state.merge({
    loading: false,
    error,
  });

const handleFetchEventsPending = (state, action) =>
  state.set('loading', true);

const handleFetchEventsComplete = (state, { payload }) =>
  state.merge({
    loading: false,
    error: false,
    results: _.keyBy(payload.results, 'id'),
  });


const handleFetchEventsError = (state, { payload: error }) =>
  state.merge({
    loading: false,
    error,
  });


export default createReducer(INITIAL_STATE, {
  [FETCH_EVENT_PENDING]: handleFetchEventPending,
  [FETCH_EVENT_COMPLETE]: handleFetchEventComplete,
  [FETCH_EVENT_ERROR]: handleFetchEventError,
  [FETCH_EVENTS_PENDING]: handleFetchEventsPending,
  [FETCH_EVENTS_COMPLETE]: handleFetchEventsComplete,
  [FETCH_EVENTS_ERROR]: handleFetchEventsError,
});
