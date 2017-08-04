import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import {
  LOGIN_COMPLETE,
  REGISTER_COMPLETE,
  LOGOUT_COMPLETE,
} from './actions';
import { UPDATE_USER_COMPLETE } from '../users/actions';


let user = window.localStorage.getItem('user');

if (user !== undefined) {
  user = JSON.parse(user);
} else {
  user = {};
}

const INITIAL_STATE = new Immutable.Map(Immutable.fromJS(user));

const handleSessionCreate = (state, action) =>
  state.merge(action.payload.user);

const handleLogout = (state, action) =>
  INITIAL_STATE.clear();

const handleUpdateUserComplete = (state, { payload }) => {
  if (payload.id !== state.get('id')) {
    return state;
  }
  return state.merge(payload);
};


export default createReducer(INITIAL_STATE, {
  [LOGIN_COMPLETE]: handleSessionCreate,
  [REGISTER_COMPLETE]: handleSessionCreate,
  [LOGOUT_COMPLETE]: handleLogout,
  [UPDATE_USER_COMPLETE]: handleUpdateUserComplete,
});
