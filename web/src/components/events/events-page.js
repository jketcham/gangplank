import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { EventsURI } from '../../uris/app/events';
import {
  getEvents,
  getEventsLoading,
  getEventsMeta,
} from '../../store/events/selectors';
import { fetchEvents } from '../../store/events/actions';
import Pagination from '../pagination';
import EventListItem from './event-list-item';


const EventsListSection = ({ date, events }) => (
  <section className="events-list__section">
    <div className="events-list__section__date">
      <span className="month">{date.format('MMM')}</span>
      <span className="date">{date.format('D')}</span>
    </div>
    <div className="events-list__section__day">
      {date.format('dddd')}
    </div>
    <div className="events-list__section__list">
      {events.map(event => <EventListItem event={event} key={event.get('id')} />).toArray()}
    </div>
  </section>
);

EventsListSection.propTypes = {
  date: PropTypes.object.isRequired,
  events: ImmutablePropTypes.orderedSet.isRequired,
};


class EventsPage extends Component {
  static propTypes = {
    fetchEvents: PropTypes.func.isRequired,
    events: ImmutablePropTypes.list.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    meta: ImmutablePropTypes.map.isRequired,
  };

  componentDidMount() {
    this.props.fetchEvents({ query: this.props.location.search });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.props.fetchEvents({ query: nextProps.location.search });
    }
  }

  getQuery(query) {
    return EventsURI.expand(query);
  }

  renderEvents() {
    // TODO: move this kind of logic to selector?
    const eventSections = this.props.events.reduce((uniqueDates, event) => {
      const eventMoment = moment(event.get('start'));

      return uniqueDates.update(
        eventMoment.startOf('day'),
        new Immutable.OrderedSet(),
        items => items.add(event),
      );
    }, new Immutable.OrderedMap());

    return eventSections.map((events, date) => (
      <EventsListSection events={events} date={date} key={date.format()} />
    )).toArray();
  }

  renderContent() {
    if (this.props.isLoading) {
      return (
        <div className="events-list">
          <em>Loading...</em>
        </div>
      );
    }

    return (
      <div className="events-list">
        {this.renderEvents()}
      </div>
    );
  }

  renderTabs() {
    const futureQuery = this.getQuery();
    const pastQuery = this.getQuery({
      start_lt: new Date().toISOString(),
      start_gt: new Date(0).toISOString(),
      sort: '-start',
    });

    return (
      <Nav pills>
        <NavItem>
          <NavLink tag={Link} to={futureQuery}>
            Upcoming
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={pastQuery}>
            Past
          </NavLink>
        </NavItem>
      </Nav>
    );
  }

  renderPagination() {
    return (
      <Pagination
        uri={EventsURI}
        meta={this.props.meta}
      />
    );
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
              <Button className="float-right">
                <Link to="/events/create">Create event</Link>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderTabs()}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderContent()}
              {this.renderPagination()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: getEvents(state),
  meta: getEventsMeta(state),
  isLoading: getEventsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: query => dispatch(fetchEvents(query)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(EventsPage);
