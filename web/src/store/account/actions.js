import { createAction } from 'redux-actions';


const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_COMPLETE = 'LOGIN_COMPLETE';
const LOGIN_ERROR = 'LOGIN_ERROR';

const login = createAction(LOGIN_PENDING);
const loginComplete = createAction(LOGIN_COMPLETE);
const loginError = createAction(LOGIN_ERROR);


export {
  LOGIN_PENDING,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  login,
  loginComplete,
  loginError,
};
