import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { ajax, handleError } from '../../api';
import {
  LOGIN_PENDING,
  LOGOUT_PENDING,
  REGISTER_PENDING,
  ACTIVATE_PENDING,
  activateComplete,
  activateError,
  loginComplete,
  loginError,
  logoutComplete,
  registerComplete,
  registerError,
} from './actions';

// TODO: handle errors from browsers that don't have localStorage
const setStorage = (response) => {
  window.localStorage.setItem('jwt_token', response.token);
  window.localStorage.setItem('user', JSON.stringify(response.user));
};

const loginEpic = action$ =>
  action$.ofType(LOGIN_PENDING)
    .mergeMap(action =>
      ajax({
        url: '/api/session',
        method: 'POST',
        responseType: 'json',
        body: action.payload,
      })
      .do(({ response }) => setStorage(response))
      .map(({ response }) => loginComplete(response))
      .catch(handleError(loginError)),
    );

const registerEpic = action$ =>
  action$.ofType(REGISTER_PENDING)
    .mergeMap(action =>
      ajax({
        url: '/api/users',
        method: 'POST',
        responseType: 'json',
        body: action.payload,
      })
      .do(({ response }) => setStorage(response))
      .map(({ response }) => registerComplete(response))
      .catch(handleError(registerError)),
    );

const logoutStorage = (action$, store, { push }) =>
  action$.ofType(LOGOUT_PENDING)
    .mergeMap((action) => {
      window.localStorage.removeItem('jwt_token');
      window.localStorage.removeItem('user');
      return Observable.of(logoutComplete());
    });

const logoutRedirect = (action$, store, { push }) =>
  action$.ofType(LOGOUT_PENDING)
    .mapTo(push('/'));

const logoutEpic = combineEpics(logoutStorage, logoutRedirect);

// TODO: shit is dense
const activateEpic = action$ =>
  action$.ofType(ACTIVATE_PENDING)
    .mergeMap(({ payload }) =>
      ajax(`/api/activations/${payload.id}`)
      .map(({ response }) => activateComplete(response))
      .catch(handleError(activateError)),
    );


export { loginEpic, registerEpic, logoutEpic, activateEpic };
