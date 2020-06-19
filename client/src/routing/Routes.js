import React from 'react';
import { Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/layout/dashboard/Dashboard";

export const Routes = ()=>{
    return(
        <section>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
        </section>
    )
}
