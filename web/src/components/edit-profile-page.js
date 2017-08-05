import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchUser, updateUser } from '../store/users/actions';
import { getUser, getUserErrors } from '../store/users/selectors';
import { getAccount } from '../store/account/selectors';

import ControlledForm from './controlled-form';


const EDIT_PROFILE_FIELDS = new Immutable.OrderedSet([
  new Immutable.Map({
    name: 'name',
    title: 'Name',
    type: 'text',
  }),
  new Immutable.Map({
    name: 'bio',
    title: 'Bio',
    type: 'textarea',
  }),
  new Immutable.Map({
    name: 'website',
    title: 'Website',
    type: 'text',
  }),
]);


class EditProfilePage extends Component {
  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    user: ImmutablePropTypes.map.isRequired,
    userErrors: ImmutablePropTypes.map.isRequired,
    fetchUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    user: null,
    userErrors: new Immutable.Map(),
  };

  componentWillMount() {
    this.props.fetchUser({ id: this.props.match.params.userId });
  }

  handleSubmit = (data) => {
    const updatedData = this.props.user.reduce((result, value, key) => {
      if (data[key] === value) {
        return result;
      }
      result[key] = data[key];
      return result;
    }, {});

    this.props.updateUser({ id: this.props.user.get('id'), ...updatedData });
  }

  renderForm() {
    return (
      <ControlledForm
        actionTitle="Edit profile"
        fields={EDIT_PROFILE_FIELDS}
        errors={this.props.userErrors}
        values={this.props.user}
        onSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    // TODO: redirect if current account is not the user being edited
    if (!this.props.user || !this.props.account) {
      return <div>Loading...</div>;
    }

    return (
      <div className="edit-account-page">
        <Container>
          <Row>
            <Col sm={12}>
              <Link to={`/people/${this.props.user.get('id')}`}>
                Back to profile page
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <h2>Edit {this.props.user.get('name')}</h2>
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
  account: getAccount(state),
  user: getUser(state, props),
  userErrors: getUserErrors(state),
});

const mapDispatchToProps = {
  updateUser,
  fetchUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(EditProfilePage);
