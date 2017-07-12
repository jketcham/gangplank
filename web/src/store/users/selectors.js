const getPeople = state =>
  state.getIn(['entities', 'users']).toList();


export {
  getPeople,
};
