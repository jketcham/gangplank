import { combineReducers } from 'redux-immutablejs';

import events from './events/reducers/entities';
import users from './users/reducers';


export default combineReducers({
  events,
  users,
});
