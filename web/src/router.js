import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import App from './components/app';
import AccountPage from './components/account/page';
import EventPage from './components/event-page';
import EventsPage from './components/events-page';
import HomePage from './components/home';
import PeoplePage from './components/people-page';


const router = (
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/events" component={EventsPage} />
        <Route path="/events/:eventId" component={EventPage} />
        <Route exact path="/people" component={PeoplePage} />
        <Route exact path="/login" component={AccountPage} />
        <Route exact path="/register" component={AccountPage} />
      </App>
    </Router>
  </Provider>
);

export default router;
