import { createSelector } from 'reselect';


const getPeople = state =>
  state.getIn(['entities', 'users']).toList();

const getPersonId = (state, props) =>
  props.match.params.userId;

const getPerson = createSelector(
  getPersonId,
  getPeople,
  (id, people) => people.get(id));


export {
  getPeople,
  getPerson,
};
