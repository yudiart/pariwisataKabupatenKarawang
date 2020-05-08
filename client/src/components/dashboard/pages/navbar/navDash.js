import React, {Fragment} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import '../../sidebar/Sidebar.css';
import {Link} from "react-router-dom";

const NavDash = ({auth:{user,loading}})=>{
    const authLinks = (
        <Nav>
            {user && user.role === 'customer'? (
                <ul>
                    <li><Link to='#notify' className={'navtopicon'}><i className='mdi mdi-bell'/></Link></li>
                    <li><Link to='#message' className={'navtopicon'}><i className='mdi mdi-message'/></Link></li>
                </ul>
            ):(<></>)}

            {user && user.role === 'admin' ?
                <ul>
                    <li><Link to='#notify' className={'navtopicon'}><i className='mdi mdi-bell'/></Link></li>
                    <li><Link to='#message' className={'navtopicon'}><i className='mdi mdi-message'/></Link></li>
                </ul>
                :user && user.role === 'villa' ?
                    <ul>
                        <li><Link to='#notify' className={'navtopicon'}><i className='mdi mdi-bell'/></Link></li>
                        <li><Link to='#message' className={'navtopicon'}><i className='mdi mdi-message'/></Link></li>
                    </ul>
                :<></>
            }
        </Nav>
    );
    return(
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
                    <img src={user && user.avatar} className='rounded-circle' style={{width:'20px'}}/>{' '}
                    {user && user.name}
                </Navbar.Brand>
                <div className='navnotify'>
                    {authLinks}
                </div>
            </Navbar>
        </Fragment>
    )
}

NavDash.propTypes = {
    auth: PropTypes.object.isRequired,
    admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin
});

export default connect(mapStateToProps, {})(NavDash);