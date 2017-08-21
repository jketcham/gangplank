import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUsers } from '../store/users/selectors';
import { fetchUsers } from '../store/users/actions';


class PeoplePage extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    users: ImmutablePropTypes.map.isRequired,
  };

  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUser = user => (
    <div key={user.get('id')}>
      <Link to={`/people/${user.get('id')}`}>{user.get('name')}</Link>
    </div>
  );

  render() {
    return (
      <div className="users-page">
        <Container>
          <Row>
            <Col>
              <h1 className="display-3">People</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.props.users.map(this.renderUser).toArray()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: getUsers(state),
});

const mapDispatchToProps = {
  fetchUsers,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(PeoplePage);
