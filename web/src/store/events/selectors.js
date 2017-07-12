const getEvents = state =>
  state.getIn(['entities', 'events', 'results']).toList();

const getEventsLoading = state =>
  state.getIn(['entities', 'events', 'loading']);

const getEvent = (state, props) =>
  state.getIn(['entities', 'events', 'results', props.match.params.eventId]);

const getEventLoading = state =>
  state.getIn(['entities', 'events', 'loading']);

// TODO: re-add when events state updated
// const getEventLoading = createSelector(
//   getEvent,
//   event => event.get('loading'),
// );


export {
  getEvent,
  getEventLoading,
  getEvents,
  getEventsLoading,
};
