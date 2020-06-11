import React, {Fragment, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import './Navbarstyle.css';
import { logout } from "../../../actions/auth";
import {getCarts, getCountCarts} from "../../../actions/cart";
import NavbarItem from "./NavbarItem";
import Customers from "./Customer";


const NavBar = ({
    auth: {isAuthenticated,loading},
    logout
}) => {

  return (
      <Fragment>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" className='shadow'>
              <div className="container">
                  <div className='navbar-brand'><Link to='/' className="nav-link text-dark">Vodo<span
                      style={{color: 'red'}}>nesia</span></Link></div>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                  {!loading ? (
                      <Navbar.Collapse id="responsive-navbar-nav">
                          <Customers/>
                          <Nav>
                              <div>{!loading && isAuthenticated === true ?
                                  <NavbarItem/> :
                                  <Nav>
                                      <Link to="/login" className='btn btn-light mr-1'>Login</Link>
                                      <Link to="/register" className='btn btn-primary'>Register</Link>
                                  </Nav>
                              }</div>
                          </Nav>
                      </Navbar.Collapse>
                  ):(
                      <></>
                  )}

              </div>
          </Navbar>
      </Fragment>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout})(NavBar);
