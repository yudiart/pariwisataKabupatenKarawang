import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../views/Dashboard/Dashboard";
import Register from "../views/Home/Register/Register";
import CreateProfile from "../views/profile/CreateProfile";
import Login from "../views/Home/Login/Login";
import ProductSingle from "../views/products/ProductSingle";
import ProductResult from "../views/products/ProductResult";
import Carts from "../views/carts/Carts";
import Account from "../views/account/Account";
import Officials from "../views/official/Officials";
import Checkout from "../views/checkout/Checkout";
const Routes = ()=>{
    return(
        <section>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/dashboard/:url" component={Dashboard}/>
                <PrivateRoute exact path="/account" component={Account}/>
                <Route exact path='/:product_name&trkid=:id' component={ProductSingle}/>
                <Route exact path='/official' component={Officials}/>
                <Route exact path='/:store_name/:product_name&trkid=:id' component={ProductSingle}/>
                <Route path="/search&q=:search" render={({ match }) => <ProductResult match={match}/>}/>
                <PrivateRoute exact path='/carts/' component={Carts}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/checkout" component={Checkout}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/CreateProfile" component={CreateProfile}/>
            </Switch>
        </section>
    )
}
export default Routes;