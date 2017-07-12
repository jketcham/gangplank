/* eslint-disable global-require */
import Immutable from 'immutable';
import _ from 'lodash';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './store/reducer';
import epic from './store/epic';

const epicMiddleware = createEpicMiddleware(epic);


const INITIAL_STATE = new Immutable.Map();

const middleware = compose(
  applyMiddleware(epicMiddleware),
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
export default store;
