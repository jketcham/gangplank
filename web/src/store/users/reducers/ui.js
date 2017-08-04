import _ from 'lodash';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import {
  FETCH_USERS_COMPLETE,
  FETCH_USERS_ERROR,
  FETCH_USERS_PENDING,
  FETCH_USER_COMPLETE,
  FETCH_USER_ERROR,
  FETCH_USER_PENDING,
  UPDATE_USER_COMPLETE,
  UPDATE_USER_ERROR,
  UPDATE_USER_PENDING,
} from '../actions';


const INITIAL_STATE = new Immutable.Map({
  users: new Immutable.Map(),
  loading: false,
  errors: new Immutable.Map({ title: '', description: new Immutable.Map() }),
});


const handleFetchUserPending = (state, action) =>
  state.set('loading', true);

const handleFetchUserError = (state, { payload: error }) =>
  state.merge({
    loading: false,
    error,
  });

const handleFetchUsersPending = (state, action) =>
  state.set('loading', true);

const handleFetchUserComplete = (state, action) =>
  state.set('loading', false);

const handleFetchUsersComplete = (state, { payload }) =>
  state.merge({
    loading: false,
    error: false,
    results: _.map(payload.results, 'id'),
  });

const handleFetchUsersError = (state, { payload: error }) =>
  state.merge({
    loading: false,
    error,
  });

const handleUpdateUserPending = (state, { payload }) =>
  state.set('loading', true);

const handleUpdateUserError = (state, { payload }) =>
  state.set('errors', Immutable.fromJS(payload.errors));

const handleUpdateUserComplete = (state, { payload }) =>
  state.set('errors', INITIAL_STATE.get('errors'));


export default createReducer(INITIAL_STATE, {
  [FETCH_USERS_COMPLETE]: handleFetchUsersComplete,
  [FETCH_USERS_ERROR]: handleFetchUsersError,
  [FETCH_USERS_PENDING]: handleFetchUsersPending,
  [FETCH_USER_COMPLETE]: handleFetchUserComplete,
  [FETCH_USER_ERROR]: handleFetchUserError,
  [FETCH_USER_PENDING]: handleFetchUserPending,
  [UPDATE_USER_COMPLETE]: handleUpdateUserComplete,
  [UPDATE_USER_ERROR]: handleUpdateUserError,
  [UPDATE_USER_PENDING]: handleUpdateUserPending,
});
