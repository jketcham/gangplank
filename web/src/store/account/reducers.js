import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import {
  LOGIN_COMPLETE,
} from './actions';


const INITIAL_STATE = new Immutable.Map();

const handleLoginComplete = (state, action) =>
  state.merge(action.payload);

export default createReducer(INITIAL_STATE, {
  [LOGIN_COMPLETE]: handleLoginComplete,
});
