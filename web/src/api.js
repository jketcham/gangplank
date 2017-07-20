import _ from 'lodash';
import { ajax as rxAjax } from 'rxjs/observable/dom/ajax';

const token = window.localStorage.getItem('jwt_token');
const HEADERS = {
  Accept: 'application/json',
};

const getHeaders = (headers) => {
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
  rxAjax(getSettings(settings))
);


export { ajax };
