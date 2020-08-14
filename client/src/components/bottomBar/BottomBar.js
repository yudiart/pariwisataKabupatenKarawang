import React, {Fragment, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import {getCarts} from "../../actions/cart";

const BottomBar = ({isAuthenticated,getCarts})=>{
    let history = useHistory();
    const [snackbar,setSnackbar] = useState(0)
    useEffect(()=>{
        getCarts()
    },[getCarts])

    return(
        <Fragment>
            <div className="bottom-navigation">
                <div className="navigation-grid">
                    <div className="navigation-home">
                        <div className="nav-home">
                            <i className="material-icons mdc-icon-button__icon" onClick={()=>{history.push('/')}}>home</i>
                            <small>Home</small>
                        </div>
                    </div>
                    <div className="navigation-official">
                        <div className="nav-official" onClick={()=>{history.push('/official')}}>
                            <i className="material-icons mdc-icon-button__icon">store_mall_directory</i>
                            <small>Officials</small>
                        </div>
                    </div>
                    <div className="navigation-carts">
                        <div className="nav-carts" onClick={()=>{
                            isAuthenticated?
                                history.push('/carts')
                                :
                                setSnackbar(!snackbar)
                            setTimeout(()=>{ setSnackbar(snackbar) }, 3000)
                        }}
                             style={{color:isAuthenticated?'':'#DBDBDB'}}>
                            <i className="material-icons mdc-icon-button__icon"
                               data-badge={isAuthenticated?2:0}
                            >shopping_cart</i>
                            <small>Carts</small>
                        </div>
                    </div>
                    <div className="navigation-account">
                        <div className="nav-account" onClick={()=>{isAuthenticated?history.push('/account'):history.push('/login')}} style={{color:isAuthenticated?'':'#DBDBDB'}}>
                            <i className="material-icons mdc-icon-button__icon style-outline ">account_circle</i>
                            <small>Account</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`snackbar ${snackbar?`show`:null}`}><i className="material-icons mdc-icon-button__icon">notification_important</i>Anda belum Login!</div>
        </Fragment>
    )
}
BottomBar.propTypes = {
    logout: PropTypes.func.isRequired,
    getCarts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alert:state.alert,
    cart:state.cart,
    profile: state.profile,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logout,getCarts}
)(BottomBar);