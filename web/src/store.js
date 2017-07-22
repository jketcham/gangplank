/* eslint-disable global-require */
import Immutable from 'immutable';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, push } from 'react-router-redux';

import { ajax } from './api';
import reducer from './store/reducer';
import epic from './store/epic';

const history = createHistory();

const epicMiddleware = createEpicMiddleware(epic, {
  dependencies: { ajax, push },
});
const routeMiddleware = routerMiddleware(history);


const INITIAL_STATE = new Immutable.Map();

const middleware = compose(
  applyMiddleware(epicMiddleware, routeMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : _.identity,
);

const store = createStore(reducer, INITIAL_STATE, middleware);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers and epics
  module.hot.accept('./store/reducer', () => {
    const nextReducer = require('./store/reducer').default;
    store.replaceReducer(nextReducer);
  });
  module.hot.accept('./store/epic', () => {
    const nextEpic = require('./store/epic').default;
    epicMiddleware.replaceEpic(nextEpic);
  });
}

window.store = store;
export { store as default, history };
