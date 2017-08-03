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

// update user
const UPDATE_USER_PENDING = 'UPDATE_USER_PENDING';
const UPDATE_USER_COMPLETE = 'UPDATE_USER_COMPLETE';
const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

const updateUser = createAction(UPDATE_USER_PENDING);
const updateUserComplete = createAction(UPDATE_USER_COMPLETE);
const updateUserError = createAction(UPDATE_USER_ERROR);

export {
  FETCH_USERS_COMPLETE,
  FETCH_USERS_ERROR,
  FETCH_USERS_PENDING,
  FETCH_USER_COMPLETE,
  FETCH_USER_ERROR,
  FETCH_USER_PENDING,
  UPDATE_USER_PENDING,
  UPDATE_USER_COMPLETE,
  UPDATE_USER_ERROR,
  fetchUser,
  fetchUserComplete,
  fetchUserError,
  fetchUsers,
  fetchUsersComplete,
  updateUser,
  updateUserComplete,
  updateUserError,
};
