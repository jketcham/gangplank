import _ from 'lodash';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import {
  FETCH_USERS_COMPLETE,
  FETCH_USER_COMPLETE,
  UPDATE_USER_COMPLETE,
} from '../actions';


const INITIAL_STATE = new Immutable.OrderedMap();


const handleFetchUserComplete = (state, { payload }) =>
  state.set(payload.id, Immutable.fromJS(payload));

const handleFetchUsersComplete = (state, { payload }) =>
  state.mergeDeep(_.keyBy(payload.results, 'id'));

const handleUserUpdateComplete = (state, { payload }) =>
  state.set(payload.id, Immutable.fromJS(payload));


export default createReducer(INITIAL_STATE, {
  [FETCH_USERS_COMPLETE]: handleFetchUsersComplete,
  [FETCH_USER_COMPLETE]: handleFetchUserComplete,
  [UPDATE_USER_COMPLETE]: handleUserUpdateComplete,
});
