import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../views/Dashboard/Dashboard";
import Login from "../views/Home/Login/Login";
import Register from "../views/Home/Register/Register";

const Routes = ()=>{
    return(
        <section>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/dashboard/:url" component={Dashboard}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </Switch>
        </section>
    )
}
export default Routes;