import { combineReducers } from 'redux-immutablejs';

import account from './account/reducers';
import config from './config/reducers';
import entities from './entities';
import router from './router';
import events from './events/reducers/ui';


const ui = combineReducers({
  events,
});


export default combineReducers({
  ui,
  account,
  config,
  entities,
  router,
});
