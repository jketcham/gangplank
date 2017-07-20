import _ from 'lodash';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import { FETCH_USERS_COMPLETE, FETCH_USER_COMPLETE } from './actions';


const INITIAL_STATE = new Immutable.Map();


function handleFetchUsersComplete(state, action) {
  if (action.error) {
    return state;
  }
  return state.merge(_.keyBy(action.payload.results, 'id'));
}
function handleFetchUserComplete(state, action) {
  if (action.error) {
    return state;
  }
  return state.set(action.payload.id, Immutable.fromJS(action.payload));
}


export default createReducer(INITIAL_STATE, {
  [FETCH_USERS_COMPLETE]: handleFetchUsersComplete,
  [FETCH_USER_COMPLETE]: handleFetchUserComplete,
});
