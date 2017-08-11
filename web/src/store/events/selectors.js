import { createSelector } from 'reselect';

const getEventsUI = state =>
  state.getIn(['ui', 'events']);

const getEvent = (state, props) =>
  state.getIn(['entities', 'events', props.match.params.eventId]);

const getEventEntities = state =>
  state.getIn(['entities', 'events']);

const getEventIds = createSelector(
  getEventsUI,
  state => state.get('ids'),
);

const getEvents = createSelector(
  getEventIds,
  getEventEntities,
  (ids, events) => ids.map(id => events.get(id)),
);

const getEventsLoading = createSelector(
  getEventsUI,
  state => state.get('loading'),
);

const getEventsMeta = createSelector(
  getEventsUI,
  state => state.get('meta'),
);

const getEventErrors = createSelector(
  getEventsUI,
  state => state.get('errors'),
);


export {
  getEvent,
  getEventErrors,
  getEventsLoading,
  getEvents,
  getEventsMeta,
};
