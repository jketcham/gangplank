import Immutable from 'immutable';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
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
    profileError: ImmutablePropTypes.map.isRequired,
    fetchUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
  };

  static defaultProps = {
    account: null,
  };

  componentWillMount() {
    this.props.fetchUser({ id: this.props.match.params.userId });
  }

  handleSubmit = (data) => {
    const updatedData = this.props.account.reduce((result, value, key) => {
      if (data[key] === value) {
        return result;
      }
      result[key] = data[key];
      return result;
    }, {});

    this.props.updateUser({ id: this.props.account.get('id'), ...updatedData });
  }

  renderForm() {
    return (
      <ControlledForm
        actionTitle="Edit profile"
        fields={EDIT_PROFILE_FIELDS}
        errors={new Immutable.Map()}
        values={this.props.account}
        onSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    if (!this.props.account) {
      return <div>Loading...</div>;
    }

    return (
      <div className="edit-account-page">
        <Container>
          <Row>
            <Col sm={12}>
              <Link to={`/people/${this.props.account.get('id')}`}>
                Back to profile page
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <h2>Edit {this.props.account.get('name')}</h2>
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
  userErrors: getUserErrors(state),
});

const mapDispatchToProps = {
  updateUser,
  fetchUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(EditProfilePage);
