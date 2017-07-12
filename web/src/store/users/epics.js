import { ajax } from 'rxjs/observable/dom/ajax';

import { FETCH_USERS_PENDING, fetchUsersComplete } from './actions';

// TODO: handle error

const fetchUsersEpic = action$ =>
  action$.ofType(FETCH_USERS_PENDING)
    .mergeMap(action =>
      ajax.getJSON('/api/users').map(
        response => fetchUsersComplete(response),
      ));


export {
  fetchUsersEpic,
};
