import Immutable from 'immutable';
import { routerReducer } from 'react-router-redux';


const router = (state, action) => (
  Immutable.fromJS(routerReducer(state, action))
);


export default router;
