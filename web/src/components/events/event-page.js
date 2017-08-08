import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAccount } from '../../store/account/selectors';
import { getEvent, getEventLoading } from '../../store/events/selectors';
import { fetchEvent } from '../../store/events/actions';


const EventInfo = ({ event }) => (
  <section className="event-info">
    <div className="event-info__header">
      <h1 className="gp-entity__title">{event.get('name')}</h1>
      <Link to={`/people/${event.getIn(['owner', 'id'])}`}>
        {event.getIn(['owner', 'name'])}
      </Link>
      <ul className="list-inline">
        <li>Starts: {moment(event.get('start')).format('lll')}</li>
        <li>Ends: {moment(event.get('end')).format('lll')}</li>
        <li>Created: {moment(event.get('date_created')).format('lll')}</li>
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
    account: ImmutablePropTypes.map.isRequired,
    match: PropTypes.object.isRequired,
    event: ImmutablePropTypes.map.isRequired,
    fetchEvent: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.fetchEvent({ id: this.props.match.params.eventId });
  }

  isOwner() {
    if (!this.props.event) return false;
    return this.props.event.getIn(['owner', 'id']) === this.props.account.get('id');
  }

  renderContent() {
    if (this.props.isLoading || !this.props.event) {
      return <div className="text-center">Loading...</div>;
    }

    return (
      <div>
        {this.renderIsOwner()}
        <EventInfo event={this.props.event} />
      </div>
    );
  }

  renderIsOwner() {
    if (!this.isOwner()) {
      return null;
    }

    return (
      <div>
        <Link to={`/events/${this.props.event.get('id')}/edit`}>
          <Button>
            Edit event
          </Button>
        </Link>
        You are an owner of this event.
      </div>
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
  account: getAccount(state),
  isLoading: getEventLoading(state, props),
  event: getEvent(state, props),
});

const mapDispatchToProps = {
  fetchEvent,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(EventPage);
