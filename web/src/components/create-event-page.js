import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { createEvent } from '../store/events/actions';
import { getEventErrors } from '../store/events/selectors';
import ControlledForm from './controlled-form';


const CREATE_EVENT_FIELDS = new Immutable.List([
  new Immutable.Map({
    name: 'name',
    title: 'Name',
    type: 'text',
    required: true,
  }),
  new Immutable.Map({
    name: 'description',
    title: 'Description',
    type: 'textarea',
    required: true,
  }),
  new Immutable.Map({
    name: 'start_date',
    title: 'Start date',
    type: 'date',
    required: true,
  }),
  new Immutable.Map({
    name: 'starttime',
    title: 'Start time',
    type: 'time',
    required: true,
  }),
  new Immutable.Map({
    name: 'end_date',
    title: 'End date',
    type: 'date',
    required: true,
  }),
  new Immutable.Map({
    name: 'endtime',
    title: 'End time',
    type: 'time',
    required: true,
  }),
  new Immutable.Map({
    name: 'promote',
    title: 'Promote event?',
    type: 'checkbox',
  }),
]);


class CreateEventPage extends Component {
  static propTypes = {
    createEvent: PropTypes.func.isRequired,
    eventError: ImmutablePropTypes.map.isRequired,
  };

  handleSubmit = (data) => {
    // TODO: remove when form is updated to handle datetime's
    const eventData = _.assign({}, data, {
      start_date: new Date(`${data.start_date}T${data.starttime}`).toISOString(),
      end_date: new Date(`${data.end_date}T${data.endtime}`).toISOString(),
    });
    this.props.createEvent(eventData);
  }

  renderForm() {
    return (
      <ControlledForm
        actionTitle="Create event"
        onSubmit={this.handleSubmit}
        errors={this.props.eventError}
        fields={CREATE_EVENT_FIELDS}
      />
    );
  }

  render() {
    return (
      <div className="create-event-page">
        <Container>
          <Row>
            <Col sm={12}>
              <h2>Create an event</h2>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {this.renderForm()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventError: getEventErrors(state),
});

const mapDispatchToProps = {
  createEvent,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(CreateEventPage);
