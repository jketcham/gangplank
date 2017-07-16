import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../store/account/actions';
import LoginForm from './login-form';
import RegisterForm from './register-form';


class AccountPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  static defaultProps = {
    register: () => ({}),
  };

  getPathname() {
    return this.props.location.pathname;
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

const mapDispatchToProps = {
  login,
};

const connector = connect(null, mapDispatchToProps);

export default connector(AccountPage);
