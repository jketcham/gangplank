import { combineReducers } from 'redux-immutablejs';

import events from './events/reducers/entities';
import users from './users/reducers/entities';


export default combineReducers({
  events,
  users,
});
