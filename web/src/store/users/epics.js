import { Observable } from 'rxjs';

import { ajax } from '../../api';

import {
  FETCH_USERS_PENDING,
  FETCH_USER_PENDING,
  fetchUserComplete,
  fetchUserError,
  fetchUsersComplete,
  fetchUsersError,
} from './actions';


const fetchUsersEpic = action$ =>
  action$.ofType(FETCH_USERS_PENDING)
    .mergeMap(action =>
      ajax('/api/users').map(
        ({ response }) => fetchUsersComplete(response),
      ),
    ).catch(error => Observable.of(fetchUsersError(error)));

const fetchUserEpic = action$ =>
  action$.ofType(FETCH_USER_PENDING)
    .mergeMap(action =>
      ajax(`/api/users/${action.payload.id}`).map(
        response => fetchUserComplete(response),
      ),
    ).catch(error => Observable.of(fetchUserError(error)));


export {
  fetchUsersEpic,
  fetchUserEpic,
};
