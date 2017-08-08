import { createSelector } from 'reselect';

const getEventEntities = state =>
  state.getIn(['entities', 'events']);

const getEventIds = state =>
  state.getIn(['ui', 'events', 'ids']);

const getEvents = createSelector(
  getEventIds,
  getEventEntities,
  (ids, events) => ids.map(id => events.get(id)),
);

const getEventsLoading = state =>
  state.getIn(['ui', 'events', 'loading']);

const getEvent = (state, props) =>
  state.getIn(['entities', 'events', props.match.params.eventId]);

const getEventLoading = state =>
  state.getIn(['ui', 'events', 'loading']);

const getEventErrors = state =>
  state.getIn(['ui', 'events', 'errors']);

// TODO: re-add when events state updated
// const getEventLoading = createSelector(
//   getEvent,
//   event => event.get('loading'),
// );


export {
  getEvent,
  getEventErrors,
  getEventLoading,
  getEvents,
  getEventsLoading,
};
