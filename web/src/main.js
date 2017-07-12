// TODO: consider importing just the necessary rxjs methods in relevant files
// instead of adding the whole library
import 'rxjs';
import ReactDOM from 'react-dom';

import router from './router';
import register from './register-service-worker';


ReactDOM.render(router, document.getElementById('root'));
register();
