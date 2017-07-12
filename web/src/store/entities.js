import { combineReducers } from 'redux-immutablejs';

import events from './events/reducers';
import users from './users/reducers';


export default combineReducers({
  events,
  users,
});
