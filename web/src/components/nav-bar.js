import _ from 'lodash';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import { connect } from 'react-redux';

import { getAccount } from '../store/account/selectors';
import NavBarAccount from './nav-bar-account';


class NavBar extends Component {
  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
  };

  state = {
    isOpen: false,
  };

  routes = {
    all: [
      { to: '/events', text: 'Events' },
    ],
    authenticated: [
      { to: '/people', text: 'People' },
    ],
    unauthenticated: [
      { to: '/login', text: 'Login' },
      { to: '/register', text: 'Register' },
    ],
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  isAuthenticated() {
    return !this.props.account.isEmpty();
  }

  renderNavItems() {
    // TODO: clean this up
    const items = _.flattenDeep(_.filter(this.routes, (routes, type) => {
      if (type === 'all') {
        return true;
      }
      if (this.isAuthenticated() && type === 'authenticated') {
        return true;
      }
      if (!this.isAuthenticated() && type === 'unauthenticated') {
        return true;
      }
      return false;
    }));

    return _.map(items, item => (
      <NavItem key={item.to}>
        <NavLink to={item.to} className="nav-link">
          {item.text}
        </NavLink>
      </NavItem>
    ));
  }

  render() {
    return (
      <Navbar light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <Link to="/" className="navbar-brand">Gangplank Chandler</Link>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {this.renderNavItems()}
            <NavBarAccount account={this.props.account} />
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}


const mapStateToProps = state => ({
  account: getAccount(state),
});

const connector = connect(mapStateToProps);


export default connector(NavBar);
