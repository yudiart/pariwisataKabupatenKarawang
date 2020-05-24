import React, {Fragment, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getCarts, getCountCarts} from "../../../actions/cart";

const Customer = ({
    getCarts,
    getCountCarts,
    cart:{count},
}) => {
    useEffect(() => {
        getCarts();
        getCountCarts();
    }, [getCarts,getCountCarts]);


    return (
        <Fragment>
            <Link to='/profiles' className='nav-link'><i className='mdi mdi-cart'/><small className='badge badge-danger'>{count}</small></Link>
            <Link to='/posts' className='nav-link'><i className='mdi mdi-bell'/></Link>
            <Link to='/profile' className='nav-link mr-4'><i className='fas fa-user'/></Link>
        </Fragment>
    );
};

Customer.propTypes = {
    cart: PropTypes.object.isRequired,
    getCountCarts: PropTypes.func.isRequired,
    getCarts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps, {getCountCarts,getCarts})(Customer);
