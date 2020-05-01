import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/home/Home";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./components/routing/Routes";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/icon/css/materialdesignicons.min.css';

//Redux related imports, connects to react
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
