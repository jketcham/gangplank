import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPeople } from '../store/users/selectors';
import { fetchUsers } from '../store/users/actions';


class PeoplePage extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    people: ImmutablePropTypes.list.isRequired,
  };

  componentWillMount() {
    this.props.fetchUsers();
  }

  renderPerson = person => (
    <div key={person.get('id')}>
      <Link to={`/people/${person.get('id')}`}>{person.get('name')}</Link>
    </div>
  );

  render() {
    return (
      <div className="people-page">
        <Container>
          <Row>
            <Col>
              <h1 className="display-3">People</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.props.people.map(this.renderPerson)}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  people: getPeople(state),
});

const mapDispatchToProps = {
  fetchUsers,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(PeoplePage);
