const getAccount = state =>
  state.get('account');

const isAuthenticated = state =>
  !getAccount(state).isEmpty();


export { getAccount, isAuthenticated };
