import React, {Fragment} from 'react';
import {Redirect, Route, Switch, useParams} from "react-router";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import NavDash from "../pages/navbar/navDash";

import DashboardDisplay from "../pages/dashboard/dashboardDisplay";
import DisplayVilla from "../pages/villa/DisplayVilla";

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
                            <h1>Customers</h1>
                        </div>
                    :null}
                    {roles === 'admin' ?
                        <div>
                            <h1>Admin</h1>
                        </div>
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