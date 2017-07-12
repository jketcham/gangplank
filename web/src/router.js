import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import App from './components/app';
import EventsPage from './components/events-page';
import EventPage from './components/event-page';
import PeoplePage from './components/people-page';
import Home from './components/home';


const router = (
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/events" component={EventsPage} />
        <Route path="/events/:eventId" component={EventPage} />
        <Route exact path="/people" component={PeoplePage} />
      </App>
    </Router>
  </Provider>
);

export default router;
