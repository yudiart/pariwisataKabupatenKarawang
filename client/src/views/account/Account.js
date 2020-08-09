import React, {Fragment, useEffect} from 'react'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import {getCarts} from "../../actions/cart";
import {useHistory} from "react-router";

const Account = ()=>{
    let history = useHistory()

    return (
        <Fragment>
            <button onClick={()=>history.goBack()}>Back</button>
            <h1>Account</h1>
        </Fragment>
    )
}

Account.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alert:state.alert,
    profile: state.profile,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logout}
)(Account);