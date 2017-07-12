import { createAction } from 'redux-actions';

// TODO: add error action creator

const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
const FETCH_USERS_COMPLETE = 'FETCH_USERS_COMPLETE';
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const fetchUsers = createAction(FETCH_USERS_PENDING);
const fetchUsersComplete = createAction(FETCH_USERS_COMPLETE);


export {
  FETCH_USERS_COMPLETE,
  FETCH_USERS_ERROR,
  FETCH_USERS_PENDING,
  fetchUsers,
  fetchUsersComplete,
};
