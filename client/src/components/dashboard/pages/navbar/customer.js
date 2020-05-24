import React, {Fragment, useEffect} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import './navDash.css';
import {Link} from "react-router-dom";
import {getCarts} from "../../../../actions/cart";
import {getCountCarts} from "../../../../actions/cart";


const Customer = ({
     getCarts,
     getCountCarts,
     cart:{count}
 })=>{
    useEffect(() => {
        getCarts();
        getCountCarts();
    }, [getCarts,getCountCarts]);
    return(
        <Fragment>
            <li><Link to='#notify' className={'navtopicon'}><i className='mdi mdi-bell'/><span className="badge badge-danger">{count}</span></Link></li>
            <li><Link to='#message' className={'navtopicon'}><i className='mdi mdi-message'/></Link></li>
        </Fragment>
    )
}




Customer.propTypes = {
    getCart: PropTypes.func.isRequired,
    getCountCarts: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps, {getCarts,getCountCarts})(Customer);