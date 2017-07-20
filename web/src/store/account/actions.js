import { createAction } from 'redux-actions';

/** register */
const REGISTER_PENDING = 'REGISTER_PENDING';
const REGISTER_COMPLETE = 'REGISTER_COMPLETE';
const REGISTER_ERROR = 'REGISTER_ERROR';

const register = createAction(REGISTER_PENDING);
const registerComplete = createAction(REGISTER_COMPLETE);
const registerError = createAction(REGISTER_ERROR);

/** login */
const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_COMPLETE = 'LOGIN_COMPLETE';
const LOGIN_ERROR = 'LOGIN_ERROR';

const login = createAction(LOGIN_PENDING);
const loginComplete = createAction(LOGIN_COMPLETE);
const loginError = createAction(LOGIN_ERROR);

/** logout */
const LOGOUT_PENDING = 'LOGOUT_PENDING';
const LOGOUT_COMPLETE = 'LOGOUT_COMPLETE';

const logout = createAction(LOGOUT_PENDING);
const logoutComplete = createAction(LOGOUT_COMPLETE);


export {
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGOUT_COMPLETE,
  LOGOUT_PENDING,
  REGISTER_COMPLETE,
  REGISTER_ERROR,
  REGISTER_PENDING,
  login,
  loginComplete,
  loginError,
  logout,
  logoutComplete,
  register,
  registerComplete,
  registerError,
};
