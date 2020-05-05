import React, {Fragment, useState} from 'react';
import './Sidebar.css'
import ToggleButton from "./ToggleButton";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import PropTypes from 'prop-types';
import Spinner from "../../layout/Spinner";
import NavItems from "./child/navitems";
import DisplayAdmin from "../pages/admin/DisplayAdmin";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import DisplayVilla from "../pages/villa/DisplayVilla";

const SideBar =({auth: { user ,loading ,isAuthenticated}}) => {
    const [state,setState]=useState(false);

    const toggleClickHandler =()=>{
        setState((prevState)=>{
            return{sideToggleOpen: !prevState.sideToggleOpen}
        });
    };
    let nav = 'sidenav';
    let right = 'right-bar';
    let sidebar = 'sidebar';
    let text = 'navtext';
    let classes = 'sidenav-nav';
    if (state.sideToggleOpen){
        text = 'navtext open';
        right ='right-bar open';
        sidebar = 'sidebar open';
        nav = 'sidenav open';
        classes ='sidenav-nav open';
    }

    return(
        loading ? <Spinner/>:
        <Fragment>
            <div className={sidebar}>
                <nav className={nav}>
                    <ToggleButton click={toggleClickHandler}/>
                    <div className={classes} role='presentation'>
                        <NavItems text={text}/>
                    </div>
                </nav>
            </div>
            <div className={right}>
                {user && user.role === 'admin'?
                    <DisplayAdmin/>
                :null}
                {user && user.role === 'customer'?
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">{user && user.name}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
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
                :null}
                {user && user.role === 'villa'?
                    <DisplayVilla/>
                :null}

            </div>
        </Fragment>
    )
}

SideBar.propTypes ={
    auth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {})
    (SideBar);