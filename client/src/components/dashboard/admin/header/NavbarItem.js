import React from 'react';
import {Link} from "react-router-dom";
import {logout} from "../../../../actions/admin";
import {Nav} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const NavbarItem =({ auth: {user, isAuthenticated, loading }, logout })=>{
    const authLinks = (
        <Nav>
            {user && user.role === 'customer'? (
                <>
                    <Link to='/profiles' className='nav-link'><i className='mdi mdi-cart'/></Link>
                    <Link to='/posts' className='nav-link'><i className='mdi mdi-bell'/></Link>
                    <Link to='/profile' className='nav-link mr-4'><i className='fas fa-user'/></Link>
                </>
            ):(<></>)}

            {user && user.role==='admin'?
                <Link to='/dashboard' className='nav-link mr-4'><i className='fas fa-tachometer-alt'/></Link>
                :
                user && user.role==='villa'?
                    <>
                        <Link to='/rooms' className='nav-link'><i className='mdi mdi-bell'/></Link>
                        <Link to='/dashboard' className='nav-link mr-4'><i className='fas fa-tachometer-alt'/></Link>
                    </>
                    :(<></>)
            }
            <div className=''>
                <Link onClick={logout} className='nav-link' to={'/login'} style={{cursor:'pointer'}}><i className="fas fa-sign-out-alt"/>{" "}Logout</Link>
            </div>
        </Nav>
    );
    return(
        <div className='toolbar-navigation-items'>
            <ul>
                <li>{!loading && isAuthenticated ? authLinks:null}</li>
            </ul>
        </div>
    )
}
NavbarItem.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavbarItem);