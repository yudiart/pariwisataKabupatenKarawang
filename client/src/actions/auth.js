import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_VILLA, CLEAR_ADMIN, CLEAR_PROFILE
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import {Redirect} from "react-router";
import React from "react";

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Registers the user
export const register = ({ fullname, email, password}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ fullname, email, password, role:'customer'});

  try {
    const res = await axios.post("/api/auth/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Login the user
export const login = ({email, password,isChecked,dashboard}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }

  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth/login", body, config);
    if(isChecked){
      localStorage.setItem('RememberMe', JSON.stringify({email,password,isChecked}))
    }
    dispatch(
        {
          type: LOGIN_SUCCESS,
          payload: res.data,
        }
    );
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg , "error"))
      );
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//Logout user and clear the profile
export const logout = ({history}) => dispatch => {
  dispatch({ type: CLEAR_VILLA });
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_ADMIN });
  return <Redirect to={'/login'}/>
};
