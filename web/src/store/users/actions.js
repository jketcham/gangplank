import { createAction } from 'redux-actions';

// TODO: add error action creator

/* fetch users */
const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
const FETCH_USERS_COMPLETE = 'FETCH_USERS_COMPLETE';
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const fetchUsers = createAction(FETCH_USERS_PENDING);
const fetchUsersComplete = createAction(FETCH_USERS_COMPLETE);

/** fetch user */
const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
const FETCH_USER_COMPLETE = 'FETCH_USER_COMPLETE';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const fetchUser = createAction(FETCH_USER_PENDING);
const fetchUserComplete = createAction(FETCH_USER_COMPLETE);
const fetchUserError = createAction(FETCH_USER_ERROR);

export {
  FETCH_USERS_COMPLETE,
  FETCH_USERS_ERROR,
  FETCH_USERS_PENDING,
  FETCH_USER_COMPLETE,
  FETCH_USER_ERROR,
  FETCH_USER_PENDING,
  fetchUser,
  fetchUserComplete,
  fetchUserError,
  fetchUsers,
  fetchUsersComplete,
};
