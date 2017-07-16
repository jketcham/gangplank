import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';

import {
  LOGIN_PENDING,
  loginComplete,
  loginError,
} from './actions';


const loginEpic = action$ =>
  action$.ofType(LOGIN_PENDING)
    .mergeMap(action =>
      ajax({
        url: '/api/session',
        method: 'POST',
        responseType: 'json',
        body: JSON.stringify(action.payload),
      }).map(response =>
        loginComplete(response),
      ),
    ).catch(error =>
      Observable.of(loginError(error)),
    );


export { loginEpic };
