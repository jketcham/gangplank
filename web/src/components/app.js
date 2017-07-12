import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './nav-bar';


const App = ({ children }) => (
  <div className="app-conainer">
    <Navbar />
    { children }
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};


export default App;
