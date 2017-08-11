import _ from 'lodash';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import {
  CREATE_EVENT_COMPLETE,
  DELETE_EVENT_COMPLETE,
  FETCH_EVENTS_COMPLETE,
  FETCH_EVENT_COMPLETE,
  FETCH_EVENT_ERROR,
  FETCH_EVENT_PENDING,
} from '../actions';


const INITIAL_STATE = new Immutable.OrderedMap();


const handleFetchEventComplete = (state, { payload }) =>
  state.set(payload.id, Immutable.fromJS(payload));

const handleFetchEventError = (state, { payload }) =>
  state;

// const handleFetchEventPending = (state, { payload }) =>
//   state.set(payload.id, EVENT_INITIAL_STATE.set('loading', true));
const handleFetchEventPending = (state, { payload }) =>
  state;

const handleFetchEventsComplete = (state, { payload }) =>
  state.mergeDeep(_.keyBy(payload.content, 'id'));

const handleEventCreate = (state, { payload }) =>
  state.set(payload.id, Immutable.fromJS(payload));

const handleDeleteComplete = (state, { payload }) =>
  state.delete(payload.id);


export default createReducer(INITIAL_STATE, {
  [CREATE_EVENT_COMPLETE]: handleEventCreate,
  [DELETE_EVENT_COMPLETE]: handleDeleteComplete,
  [FETCH_EVENTS_COMPLETE]: handleFetchEventsComplete,
  [FETCH_EVENT_COMPLETE]: handleFetchEventComplete,
  [FETCH_EVENT_ERROR]: handleFetchEventError,
  [FETCH_EVENT_PENDING]: handleFetchEventPending,
});
