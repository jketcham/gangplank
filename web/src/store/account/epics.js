import { Observable } from 'rxjs';

import { ajax, handleError } from '../../api';
import {
  LOGIN_PENDING,
  LOGOUT_PENDING,
  REGISTER_PENDING,
  loginComplete,
  loginError,
  logoutComplete,
  registerComplete,
  registerError,
} from './actions';


const loginEpic = action$ =>
  action$.ofType(LOGIN_PENDING)
    .mergeMap(action =>
      ajax({
        url: '/api/session',
        method: 'POST',
        responseType: 'json',
        body: action.payload,
      }).map(({ response }) => {
        window.localStorage.setItem('jwt_token', response.token);
        window.localStorage.setItem('user', JSON.stringify(response.user));
        return loginComplete(response);
      }).catch(handleError(loginError)),
    );

const registerEpic = action$ =>
  action$.ofType(REGISTER_PENDING)
    .mergeMap(action =>
      ajax({
        url: '/api/users',
        method: 'POST',
        responseType: 'json',
        body: action.payload,
      }).map(({ response }) => {
        window.localStorage.setItem('jwt_token', response.token);
        window.localStorage.setItem('user', JSON.stringify(response.user));
        return registerComplete(response);
      }).catch(handleError(registerError)),
    );

const logoutEpic = action$ =>
  action$.ofType(LOGOUT_PENDING)
    .mergeMap((action) => {
      window.localStorage.removeItem('jwt_token');
      window.localStorage.removeItem('user');
      return Observable.of(logoutComplete());
    });


export { loginEpic, registerEpic, logoutEpic };
