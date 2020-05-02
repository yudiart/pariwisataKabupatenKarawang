import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {Form, Button} from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../../actions/alert";
import { register } from "../../../../actions/villa";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        password2: ""
    });

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const {
        name,
        email,
        password,
        password2,
        role='villa'
    } = formData;

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords do not match", "danger");
        } else {
            register({ name, email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <div className="container mt-2 col-lg-6">
                <Form className="mt-5" onSubmit={e=> onSubmit(e)}>
                    <h1 className="text-center">Register</h1>
                    <div className="dropdown-divider"/>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control"
                               type="text"
                               name="name"
                               placeholder="Enter Name"
                               value={name}
                               onChange={e => onChange(e)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control"
                               type="email"
                               placeholder="Enter Email"
                               name="email"
                               value={email}
                               onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control"
                               type="password"
                               placeholder="Password"
                               name="password"
                               value={password}
                               onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Retype Password</label>
                        <input className="form-control"
                               type="password"
                               placeholder="Retype Password"
                               name="password2"
                               value={password2}
                               onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="nav-link">
                        <p>sudah punya akun? <Link to="/login" className="text-primary">Click me</Link></p>
                    </div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Fragment>

    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
