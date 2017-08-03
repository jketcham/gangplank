import { Observable } from 'rxjs';

import { ajax } from '../../api';

import {
  FETCH_USERS_PENDING,
  FETCH_USER_PENDING,
  UPDATE_USER_PENDING,
  fetchUserComplete,
  fetchUserError,
  fetchUsersComplete,
  fetchUsersError,
  updateUserComplete,
  updateUserError,
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
        ({ response }) => fetchUserComplete(response),
      ),
    ).catch(error => Observable.of(fetchUserError(error)));

const updateUserEpic = action$ =>
  action$.ofType(UPDATE_USER_PENDING)
    .mergeMap(action =>
      ajax({
        method: 'PATCH',
        url: `/api/users/${action.payload.id}`,
        body: action.payload,
      }).map(
        ({ response }) => updateUserComplete(response),
      ).catch(error => Observable.of(updateUserError(error)))
    );

export {
  fetchUsersEpic,
  fetchUserEpic,
  updateUserEpic,
};
