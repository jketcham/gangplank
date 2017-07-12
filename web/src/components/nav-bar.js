import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';


class NavBar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Navbar light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <Link to="/" className="navbar-brand">Gangplank Chandler</Link>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/events" className="nav-link">Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/people" className="nav-link">People</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}


export default NavBar;
