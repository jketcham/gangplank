import { combineReducers } from 'redux-immutablejs';

import account from './account/reducers';
import config from './config/reducers';
import entities from './entities';
import routing from './routing';


export default combineReducers({
  account,
  config,
  entities,
  routing,
});
