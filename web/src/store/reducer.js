import { combineReducers } from 'redux-immutablejs';

import config from './config/reducers';
import entities from './entities';
import routing from './routing';


export default combineReducers({
  config,
  entities,
  routing,
});
