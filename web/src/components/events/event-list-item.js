import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';


class EventListItem extends Component {
  static propTypes = {
    event: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);

    this.startMoment = moment(props.event.get('start'));
  }

  renderDateText() {
    return this.startMoment.fromNow();
  }

  render() {
    const { event } = this.props;

    return (
      <div className="event-item" key={event.get('id')}>
        <Row>
          <Col sm={2}>
            <div className="event-item__time" title={this.renderDateText()}>
              {this.startMoment.format('h:mm a')}
            </div>
          </Col>
          <Col sm={10}>
            <div className="event-item__content">
              <h6>
                <Link to={`/events/${event.get('id')}`}>{event.get('name')}</Link>
              </h6>
              <ul className="list-inline">
                <li className="list-inline-item">
                  Hosted by <Link to={`/people/${event.getIn(['owner', 'id'])}`}>
                    {event.getIn(['owner', 'name'])}
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventListItem;
