import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";

import LoginVila from "../layout/villa/auth/Login"
import registerVilla from "../layout/villa/auth/Register"

import Alert from "../layout/Alert";
import Dashboard from "../dashboard/admin/Admin";

import PrivateRoute from "../routing/PrivateRoute";
import VillaProfile from "../villa/villa-forms/CreateVillaProfile";
import editVilla from "../villa/villa-forms/EditVilla";
import AddEducation from "../profile-forms/AddEducation";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import Profiles from "../profiles/Profiles";
import NotFound from "../layout/NotFound";
import Profile from "../profile/Profile";
import Covid from "../covid/Covids";
import Rooms from "../rooms/Rooms";

export const Routes = () => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/villa/login" component={LoginVila} />
        <Route exact path="/villa/register" component={registerVilla} />

        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/covid" component={Covid} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/villa-profile" component={VillaProfile} />
        <PrivateRoute exact path="/edit-villa" component={editVilla} />
        <PrivateRoute exact path="/add-room" component={Rooms} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
