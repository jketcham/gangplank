import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getEvent, getEventLoading } from '../store/events/selectors';
import { fetchEvent } from '../store/events/actions';


const EventInfo = ({ event }) => (
  <section className="event-info">
    <div className="event-info__header">
      <h4>{event.get('name')}</h4>
      <Link to={`/people/${event.getIn(['creator', 'id'])}`}>
        {event.getIn(['creator', 'name'])}
      </Link>
      <ul className="list-inline">
        <li>Starts: {moment(event.get('start_date')).format('lll')}</li>
      </ul>
    </div>
    <div className="event-info__description">
      <p>{event.get('description')}</p>
    </div>
  </section>
);

EventInfo.propTypes = {
  event: ImmutablePropTypes.map.isRequired,
};


class EventPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    event: ImmutablePropTypes.map.isRequired,
    fetchEvent: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.fetchEvent({ id: this.props.match.params.eventId });
  }

  renderContent() {
    if (this.props.isLoading || !this.props.event) {
      return <div className="text-center">Loading...</div>;
    }

    return (
      <EventInfo event={this.props.event} />
    );
  }

  render() {
    return (
      <div className="event-page">
        <Container>
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

const mapStateToProps = (state, props) => ({
  isLoading: getEventLoading(state, props),
  event: getEvent(state, props),
});

const mapDispatchToProps = {
  fetchEvent,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(EventPage);
