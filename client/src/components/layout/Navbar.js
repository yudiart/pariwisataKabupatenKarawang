import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import { logout } from "../../actions/auth";

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
        <Nav>
            <Link to='/profiles' className='nav-link'><i className='fas fa-users'/>Profiles</Link>
            <a onClick={logout} className='nav-link'><i className="fas fa-sign-out-alt"/>{" "}Logout</a>
        </Nav>

  );

  const guestLinks = (
      <Nav>
          <Link to="/login" className='nav-link border-right'>Login</Link>
          <Link to="/register" className='nav-link'>Register</Link>
      </Nav>


  );

  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <div className="container">
              <Navbar.Brand href="/">Vodo<span style={{color:'red'}}>nesia</span> </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                      <Nav.Link href="#features">Features</Nav.Link>
                      <Nav.Link href="#pricing">Pricing</Nav.Link>
                      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
                  <Nav>
                  {!loading && (
                      <div>{isAuthenticated ? authLinks : guestLinks}</div>
                  )}
                  </Nav>
              </Navbar.Collapse>
          </div>
      </Navbar>


  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);
