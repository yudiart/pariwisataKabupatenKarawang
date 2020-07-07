import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../views/Dashboard/Dashboard";
import Register from "../views/Home/Register/Register";
import CreateProfile from "../views/profile/CreateProfile";
import Login from "../views/Home/Login/Login";
const Routes = ()=>{
    return(
        <section>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/dashboard/:url" component={Dashboard}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/CreateProfile" component={CreateProfile}/>
            </Switch>
        </section>
    )
}
export default Routes;