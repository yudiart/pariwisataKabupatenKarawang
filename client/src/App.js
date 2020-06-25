import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

//Redux related imports, connects to react
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Routes from "./routing/Routes";
import Home from "./views/Home/Home";
import Login from "./views/Home/Login/Login";
import Register from "./views/Home/Register/Register";

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
            <Route exact path="/" component={Home}/>
            <Route exact component={Routes}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
