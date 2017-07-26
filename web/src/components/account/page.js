import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Button,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, register } from '../../store/account/actions';
import { getAccount } from '../../store/account/selectors';
import LoginForm from './login-form';
import RegisterForm from './register-form';


class AccountPage extends Component {
  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    location: PropTypes.object.isRequired,

    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  };

  getPathname() {
    return this.props.location.pathname;
  }

  /**
   * If the `location` prop's state is not undefined, the user was redirected here
   * and we can send them back from whence they came.
   */
  getReferrer() {
    if (this.props.location.state) {
      return this.props.location.state.from;
    }
    return { pathname: '/' };
  }

  handleSubmit = (data) => {
    if (this.getPathname() === '/login') {
      return this.props.login(data);
    }
    return this.props.register(data);
  }

  renderHeader() {
    if (this.getPathname() === '/login') {
      return (
        <div>
          <h3>Login</h3>
        </div>
      );
    }
    return (
      <div>
        <h3>Register</h3>
      </div>
    );
  }

  renderForm() {
    if (this.getPathname() === '/login') {
      return (
        <LoginForm onSubmit={this.handleSubmit} />
      );
    }
    return (
      <RegisterForm onSubmit={this.handleSubmit} />
    );
  }

  renderFooter() {
    if (this.getPathname() === '/login') {
      return (
        <div className="section-footer">
          <p>Don&apos;t have an account?</p>
          <Link to="/register">
            <Button>
              Register
            </Button>
          </Link>
        </div>
      );
    }
    return (
      <div className="section-footer">
        <p>Welcome back.</p>
        <Link to="/login">
          <Button>
            Login
          </Button>
        </Link>
      </div>
    );
  }

  render() {
    if (!this.props.account.isEmpty()) {
      return <Redirect to={this.getReferrer()} />;
    }

    return (
      <div className="account-page">
        <Container>
          <Row>
            <Col sm={12}>
              {this.renderHeader()}
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {this.renderForm()}
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {this.renderFooter()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: getAccount(state),
});

const mapDispatchToProps = {
  login,
  register,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AccountPage);
