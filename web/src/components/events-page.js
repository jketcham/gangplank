import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getEvents, getEventsLoading } from '../store/events/selectors';
import { fetchEvents } from '../store/events/actions';


class EventsPage extends Component {
  static propTypes = {
    fetchEvents: PropTypes.func.isRequired,
    events: ImmutablePropTypes.list.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.fetchEvents();
  }

  renderEvent(event) {
    return (
      <div className="event-item" key={event.get('id')}>
        <h6>
          <Link to={`/events/${event.get('id')}`}>{event.get('name')}</Link>
        </h6>
        <ul className="list-inline">
          <li className="list-inline-item">{moment(event.get('start_date')).format('lll')}</li>
          <li className="list-inline-item">
            <em>in {moment(event.get('start_date')).toNow(true)}</em>
          </li>
        </ul>
      </div>
    );
  }

  renderContent() {
    if (this.props.isLoading) {
      return (
        <em>Loading...</em>
      );
    }

    return this.props.events.map(this.renderEvent).toJS();
  }

  render() {
    return (
      <div className="events-page">
        <Container>
          <Row>
            <Col>
              <h1 className="display-3">Events</h1>
            </Col>
            <Col>
              <Button>
                <Link to="/events/create">Create event</Link>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderContent()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: getEvents(state),
  isLoading: getEventsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: query => dispatch(fetchEvents(query)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(EventsPage);
