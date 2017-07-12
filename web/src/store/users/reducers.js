import _ from 'lodash';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import { FETCH_USERS_COMPLETE } from './actions';


const user = window.__INITIAL_STATE__.user;

const INITIAL_STATE = new Immutable.Map({
  [user.id]: Immutable.fromJS(user),
});


function handleFetchUsersComplete(state, action) {
  if (action.error) {
    return state;
  }
  return state.merge(_.keyBy(action.payload.results, 'id'));
}


export default createReducer(INITIAL_STATE, {
  [FETCH_USERS_COMPLETE]: handleFetchUsersComplete,
});
