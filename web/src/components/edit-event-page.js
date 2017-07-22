import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchEvent, updateEvent } from '../store/events/actions';
import { getEvent, getEventErrors } from '../store/events/selectors';
import ControlledForm from './controlled-form';


const EDIT_EVENT_FIELDS = new Immutable.List([
  new Immutable.Map({
    name: 'name',
    title: 'Name',
    type: 'text',
  }),
  new Immutable.Map({
    name: 'description',
    title: 'Description',
    type: 'textarea',
  }),
  new Immutable.Map({
    name: 'start_date',
    title: 'Start date',
    type: 'date',
  }),
  new Immutable.Map({
    name: 'starttime',
    title: 'Start time',
    type: 'time',
  }),
  new Immutable.Map({
    name: 'end_date',
    title: 'End date',
    type: 'date',
  }),
  new Immutable.Map({
    name: 'endtime',
    title: 'End time',
    type: 'time',
  }),
  new Immutable.Map({
    name: 'promote',
    title: 'Promote event?',
    type: 'checkbox',
  }),
]);


class EditEventPage extends Component {
  static propTypes = {
    updateEvent: PropTypes.func.isRequired,
    fetchEvent: PropTypes.func.isRequired,
    event: ImmutablePropTypes.map.isRequired,
    eventError: ImmutablePropTypes.map.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    event: new Immutable.Map(),
  };

  componentWillMount() {
    this.props.fetchEvent({ id: this.props.match.params.eventId });
  }

  handleSubmit = (data) => {
    // TODO: remove when form is updated to handle datetime's
    // const eventData = _.assign({}, data, {
    //   start_date: new Date(`${data.start_date}T${data.starttime}`).toISOString(),
    //   end_date: new Date(`${data.end_date}T${data.endtime}`).toISOString(),
    // });
    const updatedData = this.props.event.reduce((result, value, key) => {
      if (data[key] === value) {
        return result;
      }
      result[key] = data[key];
      return result;
    }, {});
    this.props.updateEvent({ id: this.props.event.get('id'), ...updatedData });
  }

  renderForm() {
    return (
      <ControlledForm
        actionTitle="Edit event"
        fields={EDIT_EVENT_FIELDS}
        errors={this.props.eventError}
        values={this.props.event}
        onSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    // TODO: need to redirect if not authorized to view page
    return (
      <div className="edit-event-page">
        <Container>
          <Row>
            <Col sm={12}>
              <h2>Edit {this.props.event.get('name')}</h2>
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

const mapStateToProps = (state, props) => ({
  event: getEvent(state, props),
  eventError: getEventErrors(state),
});

const mapDispatchToProps = {
  updateEvent,
  fetchEvent,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(EditEventPage);
