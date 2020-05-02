import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";


const Login = ({login, isAuthenticated,auth:{user},loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData;

  const onSubmit = async e => {
    e.preventDefault();
      login(email, password);
  };

  //redirect if logged in
  if (isAuthenticated && user && user.role === 'customer'){
    return <Redirect to={'/profile'}/>
  }
  //redirect if logged in
  if (isAuthenticated && user && user.role === 'villa'){
    return <Redirect to={'/dashboard'}/>
  }
  if (isAuthenticated && user && user.role === 'admin'){
    return <Redirect to={'/dashboard'}/>
  }

  return (
      <Fragment>
        <div className="container mt-2 col-lg-4">
          <form className="mt-5" onSubmit={e => onSubmit(e)}>
            <h1 className="text-center">Login</h1>
            <div className="dropdown-divider"> </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                minLength="6"
              />
            </div>
            <button type="submit" className="btn btn-primary" value="Login">Login</button>
          </form>
          <div>
            <p>Belum punya akun? <Link to="/register" className="text-primary">Click me</Link></p>
          </div>
        </div>
      </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
