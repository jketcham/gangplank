import { Observable } from 'rxjs';

import { handleError } from '../../api';

import {
  FETCH_USERS_PENDING,
  FETCH_USER_PENDING,
  UPDATE_USER_PENDING,
  UPDATE_USER_COMPLETE,
  fetchUserComplete,
  fetchUserError,
  fetchUsersComplete,
  fetchUsersError,
  updateUserComplete,
  updateUserError,
} from './actions';


const fetchUsersEpic = (action$, store, { ajax }) =>
  action$.ofType(FETCH_USERS_PENDING)
    .mergeMap(action =>
      ajax('/api/users').map(
        ({ response }) => fetchUsersComplete(response),
      ).catch(handleError(fetchUsersError)),
    );

const fetchUserEpic = (action$, store, { ajax }) =>
  action$.ofType(FETCH_USER_PENDING)
    .mergeMap(action =>
      ajax(`/api/users/${action.payload.id}`).map(
        ({ response }) => fetchUserComplete(response),
      ).catch(handleError(fetchUserError)),
    );

const updateUserEpic = (action$, store, { ajax }) =>
  action$.ofType(UPDATE_USER_PENDING)
    .mergeMap(action =>
      ajax({
        method: 'PATCH',
        url: `/api/users/${action.payload.id}`,
        body: action.payload,
      }).map(({ response }) => {
        window.localStorage.setItem('user', JSON.stringify(response));
        return updateUserComplete(response);
      }).catch(handleError(updateUserError)),
    );

const updateUserNavigateEpic = (action$, store, { push }) =>
  action$.ofType(UPDATE_USER_COMPLETE)
    .mergeMap(action =>
      Observable.of(push(`/people/${action.payload.id}`)),
    );

export {
  fetchUserEpic,
  fetchUsersEpic,
  updateUserEpic,
  updateUserNavigateEpic,
};
