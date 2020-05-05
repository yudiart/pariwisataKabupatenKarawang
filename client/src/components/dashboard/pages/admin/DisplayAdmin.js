import React, {Fragment, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAllUsers,getAllCustomers} from "../../../../actions/admin";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

const DisplayAdmin = ({
  getAllCustomers,
  getAllUsers,
  auth: { user,isAuthenticated },match
})=>{

    useEffect(() => {
        getAllCustomers();
        getAllUsers();
    }, [getAllCustomers,getAllUsers]);


    return(
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">{user && user.name} </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='basic-navbar-nav'>
                    <Nav className="mr-auto">
                        <Nav.Link href="#notify"><i className='mdi mdi-bell'/> </Nav.Link>
                        <Nav.Link href="#cart"><i className='mdi mdi-cart'/><span className='badge badge-danger'>1</span></Nav.Link>
                        <NavDropdown title={<i className='mdi mdi-message'/> } id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}

DisplayAdmin.propTypes = {
    getAllCustomers: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin
});

export default connect(
    mapStateToProps,
    { getAllCustomers,getAllUsers}
)(DisplayAdmin);