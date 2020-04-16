import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import { logout } from "../../actions/auth";

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
        <Nav>
            <Link to='/posts' className='nav-link'><i className='mdi mdi-file-outline'/></Link>
            <Link to='/profiles' className='nav-link'><i className='fas fa-users'/></Link>
            <Link to='/dashboard' className='nav-link mr-4'><i className='fas fa-tachometer-alt'/></Link>
            <div className=''>
                <a onClick={logout} className='nav-link' style={{cursor:'pointer'}}><i className="fas fa-sign-out-alt"/>{" "}Logout</a>
            </div>
        </Nav>

  );

  const guestLinks = (
      <Nav>
          <Link to="/login" className='nav-link border-right'>Login</Link>
          <Link to="/register" className='nav-link'>Register</Link>
      </Nav>


  );

  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" className=''>
          <div className="container">
              <div className='navbar-brand'><Link to='/' className="nav-link" style={{color:"white"}}>Vodo<span style={{color:'red'}}>nesia</span></Link></div>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                      <Link to="/covid" className='nav-link'>Covid</Link>
                      <Link to="/villa" className='nav-link'>Villa</Link>
                      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Villa</NavDropdown.Item>
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
