import React, { Component } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { getPerson } from '../store/users/selectors';
import { fetchUser } from '../store/users/actions';


class ProfilePage extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    profile: ImmutablePropTypes.map.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    profile: new Immutable.Map(),
  };

  componentDidMount() {
    this.props.fetchUser({ id: this.props.match.params.userId });
  }

  renderHeader() {
    return (
      <header className="profile-page__header">
        <Row>
          <Col sm={6}>
            <small>Name</small>
            <h3>{this.props.profile.get('name')}</h3>
          </Col>
          <Col sm={6}>
            <small>Bio</small>
            <p>{this.props.profile.get('bio')}</p>
            <small>Website</small>
            <p>{this.props.profile.get('website')}</p>
          </Col>
          <Col sm={12}>
            <a href={"/people/" + this.props.profile.get('id') + "/edit"}>Edit Profile</a>
          </Col>
        </Row>
      </header>
    );
  }

  render() {
    return (
      <div className="profile-page">
        <Container>
          {this.renderHeader()}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  profile: getPerson(state, props),
});

const mapDispatchToProps = {
  fetchUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(ProfilePage);
