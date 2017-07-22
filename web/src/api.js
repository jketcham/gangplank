import _ from 'lodash';
import { Observable } from 'rxjs';
import { ajax as rxAjax } from 'rxjs/observable/dom/ajax';

const HEADERS = {
  Accept: 'application/json',
};

const getHeaders = (headers) => {
  const token = window.localStorage.getItem('jwt_token');
  let ajaxHeaders = _.assign({}, HEADERS, headers);

  if (token) {
    ajaxHeaders = _.assign(ajaxHeaders, { Authorization: `JWT ${token}` });
  }

  return ajaxHeaders;
};

const getBody = (body) => {
  if (body === null || body === undefined) {
    return {};
  }
  return JSON.stringify(body);
};

const getSettings = (settings) => {
  let url = settings.url;
  if (typeof settings === 'string') {
    url = settings;
  }
  const method = settings.method || 'GET';
  const body = getBody(settings.body);
  const headers = getHeaders(settings.headers);

  return {
    method,
    url,
    body,
    headers,
    responseType: 'json',
  };
};


const ajax = settings => (
  rxAjax(getSettings(settings)).catch((error) => {
    // handle auth token expiring
    // TODO: update comparing description to a constant value
    if (_.get(error.xhr.response, 'description') === 'Signature has expired') {
      window.localStorage.removeItem('jwt_token');
      window.localStorage.removeItem('user');
      // TODO: handle dispatching LOGOUT/SESSION_EXPIRE action here too
    }
    throw error;
  })
);

const handleError = handler => (error) => {
  // TODO: redirect to login page on session expire?
  // TODO: need to handle using a "refresh token" or some simliar method
  // to get a new access token
  if (error.xhr.response.description === 'Signature has expired') {
    return Observable.of({ type: 'LOGOUT_COMPLETE', payload: error })
      .concat(Observable.of(handler({ errors: error.xhr.response })));
  }
  return Observable.of(handler({ errors: error.xhr.response }));
};


export { ajax, handleError };
