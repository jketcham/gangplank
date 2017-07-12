import { combineEpics } from 'redux-observable';

import * as eventEpics from './events/epics';
import * as userEpics from './users/epics';


// TODO: get object spread operator working here
const rootEpic = combineEpics(
  eventEpics.fetchEventEpic,
  eventEpics.fetchEventsEpic,
  userEpics.fetchUsersEpic,
);


export default rootEpic;
