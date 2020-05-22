import React, {Fragment, useEffect} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import './navDash.css';
import {Link} from "react-router-dom";
import {getCarts} from "../../../../actions/cart";
import {getCountCarts} from "../../../../actions/cart";


const NavDash = ({
    getCarts,
    getCountCarts,
    cart:{count},
    auth:{user,loading}
})=>{
    useEffect(() => {
        getCarts();
        getCountCarts();
    }, [getCarts,getCountCarts]);
    const authLinks = (
        <Nav>
            {user && user.role === 'customer'? (
                <ul>
                    <li><Link to='#notify' className={'navtopicon'}><i className='mdi mdi-bell'/><span className="badge badge-danger">{count}</span></Link></li>
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
            <div className="nav-dash navbar">
                    <Link className="navbar-brand nav-link" to={'/dashboard'}>
                        <img src={user && user.avatar} className='rounded-circle' alt="" style={{width:'20px'}}/>{' '}
                        {user && user.name}
                    </Link>
                    <div className='navnotify'>
                        {authLinks}
                    </div>
            </div>
        </Fragment>
    )
}




NavDash.propTypes = {
    getCart: PropTypes.func.isRequired,
    getCountCarts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    admin: PropTypes.object.isRequired,
    cart: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin,
    cart: state.cart
});

export default connect(mapStateToProps, {getCarts,getCountCarts})(NavDash);