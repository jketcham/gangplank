import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createEvent } from '../store/events/actions';


class CreateEventPage extends Component {
  static propTypes = {
    createEvent: PropTypes.func.isRequired,
  };

  handleCreate() {

  }

  render() {
    return (
      <div>create event</div>
    );
  }
}

const mapDispatchToProps = {
  createEvent,
};

const connector = connect(null, mapDispatchToProps);


export default connector(CreateEventPage);
