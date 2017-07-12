import Immutable from 'immutable';
import { routerReducer } from 'react-router-redux';


const routing = (state, action) => (
  Immutable.fromJS(routerReducer(state, action))
);


export default routing;
