import _ from 'lodash';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchEvent, updateEvent } from '../store/events/actions';
import { getEvent, getEventErrors } from '../store/events/selectors';
import ControlledForm from './controlled-form';


const EDIT_EVENT_FIELDS = new Immutable.OrderedSet([
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
    name: 'start',
    title: 'Start',
    type: 'datetime-local',
  }),
  new Immutable.Map({
    name: 'end',
    title: 'End',
    type: 'datetime-local',
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

  // the HTML datetime-local input we use doesn't allow non-local datetime
  // strings, so this method removes the timezone info
  cleanEventValues = () => (
    this.props.event.withMutations(event => event
      .update('start', '', date => moment(date).format().slice(0, -6))
      .update('end', '', date => moment(date).format().slice(0, -6)),
    )
  )

  handleSubmit = (data) => {
    const updatedData = this.props.event.reduce((result, value, key) => {
      if (data[key] === value) {
        return result;
      }
      result[key] = data[key];
      return result;
    }, {});

    const start = moment(data.start).utc().format();
    const end = moment(data.end).utc().format();
    const eventData = _.assign({}, updatedData, { start, end });

    this.props.updateEvent({ id: this.props.event.get('id'), ...eventData });
  }

  renderForm() {
    return (
      <ControlledForm
        actionTitle="Edit event"
        fields={EDIT_EVENT_FIELDS}
        errors={this.props.eventError}
        values={this.cleanEventValues()}
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
              <Link to={`/events/${this.props.event.get('id')}`}>
                Back to event page
              </Link>
            </Col>
          </Row>
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
