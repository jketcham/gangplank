import { combineEpics } from 'redux-observable';

import * as eventEpics from './events/epics';
import * as userEpics from './users/epics';
import * as accountEpics from './account/epics';


// TODO: get object spread operator working here?
const rootEpic = combineEpics(
  eventEpics.fetchEventEpic,
  eventEpics.fetchEventsEpic,
  eventEpics.createEventEpic,
  userEpics.fetchUsersEpic,
  userEpics.fetchUserEpic,
  accountEpics.loginEpic,
  accountEpics.registerEpic,
  accountEpics.logoutEpic,
);


export default rootEpic;
