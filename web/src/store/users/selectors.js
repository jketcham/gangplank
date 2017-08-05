import { createSelector } from 'reselect';


const getUsers = state =>
  state.getIn(['entities', 'users']);

const getUserId = (state, props) =>
  props.match.params.userId;

const getUser = createSelector(
  getUserId,
  getUsers,
  (id, users) => users.get(id));

const getUserErrors = state =>
  state.getIn(['ui', 'users', 'errors']);


export {
  getUser,
  getUserErrors,
  getUsers,
};
