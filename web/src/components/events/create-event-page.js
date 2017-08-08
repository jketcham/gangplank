import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { createEvent, fetchEvents } from '../../store/events/actions';
import { getEvents, getEventErrors } from '../../store/events/selectors';
import ControlledForm from '../controlled-form';


const CREATE_EVENT_FIELDS = new Immutable.OrderedSet([
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
    name: 'start',
    title: 'Start',
    type: 'datetime-local',
    required: true,
  }),
  new Immutable.Map({
    name: 'end',
    title: 'End',
    type: 'datetime-local',
    required: true,
  }),
]);


class CreateEventPage extends Component {
  static propTypes = {
    createEvent: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    eventError: ImmutablePropTypes.map.isRequired,
    events: ImmutablePropTypes.list.isRequired,
  };

  state = {
    formValues: new Immutable.Map(),
  };

  componentDidUpdate(nextProps, nextState) {
    if (nextState.formValues
        && nextState.formValues.has('start')
        && nextState.formValues.get('start') !== this.state.formValues.get('start')) {
      this.props.fetchEvents();
    }
  }

  handleChange = (formValues) => {
    this.setState({ formValues });
  }

  handleSubmit = (data) => {
    const start = moment(data.start).utc().format();
    const end = moment(data.end).utc().format();
    const eventData = _.assign({}, data, { start, end });

    this.props.createEvent(eventData);
  }

  renderForm() {
    return (
      <ControlledForm
        actionTitle="Create event"
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        errors={this.props.eventError}
        fields={CREATE_EVENT_FIELDS}
      />
    );
  }

  renderEventsCalendar() {
    const { formValues } = this.state;
    const { events } = this.props;

    if (!formValues.has('date')) {
      return (
        <div>
          <em>Select a start date to see other events that day.</em>
        </div>
      );
    }

    return (
      <div>
        <h5>
          Events on {moment(formValues.getIn(['date', 'value'])).format('ll')}
        </h5>
        <ul className="list-unstyled">
          {events.map(e => e)}
        </ul>
      </div>
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
            <Col sm={8}>
              {this.renderForm()}
            </Col>
            <Col sm={4}>
              {this.renderEventsCalendar()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventError: getEventErrors(state),
  events: getEvents(state),
});

const mapDispatchToProps = {
  createEvent,
  fetchEvents,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(CreateEventPage);
