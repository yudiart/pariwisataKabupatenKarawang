import React, {Fragment} from 'react';
import {Redirect, Route, Switch, useParams} from "react-router";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import NavDash from "../pages/navbar/navDash";

import DashboardDisplay from "../pages/dashboard/dashboardDisplay";
import DisplayVilla from "../pages/villa/DisplayVilla";
import DisplayAdmin from "../pages/admin/DisplayAdmin";
import DisplayCustomer from "../pages/customer/DisplayCustomer";

const RightContent = ({auth:{user,loading}})=>{
    let {pages} = useParams();
    let roles = user && user.role;
    return (
        <section>
            <section>
                <Switch>
                    <Route path="/dashboard" children={<NavDash/>}/>
                    <Route path="/dashboard/:pages" children={<NavDash/>}/>
                </Switch>
            </section>
            <Fragment>
                {window.location.pathname === '/dashboard'?
                    <div>
                        <DashboardDisplay/>
                    </div>
                :null}
                <div>
                    {roles === 'villa'?
                        <DisplayVilla/>:null
                    }
                    {roles === 'customer' ?
                        <div>
                            <DisplayCustomer/>
                        </div>
                    :null}
                    {roles === 'admin' ?
                        <DisplayAdmin/>
                    :null}
                </div>
            </Fragment>
        </section>

    )
}
RightContent.propTypes ={
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {})
(RightContent);