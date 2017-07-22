const getEvents = state =>
  state.getIn(['entities', 'events']).toList();

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
