import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './store';

import App from './components/app';
import AccountPage from './components/account/page';
import EventPage from './components/event-page';
import EditEventPage from './components/edit-event-page';
import CreateEventPage from './components/create-event-page';
import EventsPage from './components/events-page';
import HomePage from './components/home';
import PeoplePage from './components/people-page';
import ProfilePage from './components/profile-page';


const router = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact path="/" component={HomePage} />
        <Switch>
          <Route exact path="/events" component={EventsPage} />
          <Route exact path="/events/create" component={CreateEventPage} />
          <Route exact path="/events/:eventId" component={EventPage} />
          <Route exact path="/events/:eventId/edit" component={EditEventPage} />
        </Switch>
        <Route path="/people/:userId" component={ProfilePage} />
        <Route exact path="/people" component={PeoplePage} />
        <Route exact path="/login" component={AccountPage} />
        <Route exact path="/register" component={AccountPage} />
      </App>
    </ConnectedRouter>
  </Provider>
);

export default router;
