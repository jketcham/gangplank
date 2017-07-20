import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../store/account/actions';


class NavBarAccount extends Component {
  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  isAuthenticated() {
    return !this.props.account.isEmpty();
  }

  render() {
    if (!this.isAuthenticated()) {
      return null;
    }

    // TODO: update NavLink urls to use URL module w/ config
    return (
      <div>
        <NavDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle nav caret>
            {this.props.account.get('name')}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <NavLink
                to={`/people/${this.props.account.get('id')}`}
                className="nav-link"
              >Your profile</NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink
                to={`/events?creator=${this.props.account.get('id')}`}
                className="nav-link"
              >Your events</NavLink>
            </DropdownItem>
            <DropdownItem>
              <div className="nav-link">
                <div onClick={this.props.logout}>
                  Log out
                </div>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </NavDropdown>
      </div>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

const connector = connect(null, mapDispatchToProps);


export default connector(NavBarAccount);
