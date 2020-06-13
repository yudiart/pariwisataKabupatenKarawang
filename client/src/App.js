import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

import { useRouteMatch } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}else{
    localStorage.setItem('token',null);
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
              <Route exact component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
