import { combineReducers } from 'redux-immutablejs';

import account from './account/reducers';
import config from './config/reducers';
import entities from './entities';
import router from './router';
import events from './events/reducers/ui';
import users from './users/reducers/ui';


const ui = combineReducers({
  events,
  users,
});


export default combineReducers({
  ui,
  account,
  config,
  entities,
  router,
});
