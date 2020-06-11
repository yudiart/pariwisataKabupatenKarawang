import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import './dashboardDisplay.css';
import VillaItem from "../villa/DashboardDisplayVillaItem";
const DashboardDisplay = ({auth:{user}})=>{
    return(
        <Fragment>
            <div>
                {user && user.role === 'admin'?
                    <h1>Admin</h1>
                :null}
                {user&&user.role ==='villa'?
                    <VillaItem/>
                :null}
            </div>
        </Fragment>
    )
}

DashboardDisplay.propTypes={
    auth: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth

})
export default connect(mapStateToProps,{}) (DashboardDisplay);