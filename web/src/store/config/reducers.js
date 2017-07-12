import _ from 'lodash';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';


const CONFIG = window.__INITIAL_STATE__;


const INITIAL_STATE = new Immutable.Map({
  user: _.get(CONFIG, 'user.id'),
});


export default createReducer(INITIAL_STATE, {});
