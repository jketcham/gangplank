import React, { Component } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import { getAccount } from '../store/account/selectors';
import { getUser } from '../store/users/selectors';
import { fetchUser } from '../store/users/actions';


class ProfilePage extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    account: ImmutablePropTypes.map.isRequired,
    profile: ImmutablePropTypes.map.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    profile: new Immutable.Map(),
  };

  componentDidMount() {
    this.props.fetchUser({ id: this.props.match.params.userId });
  }

  renderEditButton() {
    if (this.props.account.get('id') !== this.props.profile.get('id')) {
      return null;
    }

    return (
      <Link
        className="float-right"
        to={`/people/${this.props.profile.get('id')}/edit`}
      >
        <Button>
          Edit profile
        </Button>
      </Link>
    );
  }

  renderHeader() {
    return (
      <header className="profile-page__header">
        <Row>
          <Col sm={12}>
            {this.renderEditButton()}
          </Col>
        </Row>
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
  profile: getUser(state, props),
  account: getAccount(state),
});

const mapDispatchToProps = {
  fetchUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(ProfilePage);
