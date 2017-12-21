import { combineEpics } from 'redux-observable';

import * as eventEpics from './events/epics';
import * as userEpics from './users/epics';
import * as accountEpics from './account/epics';


// TODO: get object spread operator working here?
const rootEpic = combineEpics(
  accountEpics.activateEpic,
  accountEpics.loginEpic,
  accountEpics.logoutEpic,
  accountEpics.registerEpic,
  eventEpics.createEventEpic,
  eventEpics.deleteEventEpic,
  eventEpics.deleteEventNavigateEpic,
  eventEpics.fetchEventEpic,
  eventEpics.fetchEventsEpic,
  eventEpics.updateEventEpic,
  eventEpics.updateEventNavigateEpic,
  userEpics.fetchUserEpic,
  userEpics.fetchUsersEpic,
  userEpics.updateUserEpic,
  userEpics.updateUserNavigateEpic,
);


export default rootEpic;
