import React from 'react';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

const FormVilla = ()=>{
    return(
        <div>
            <Form className="mt-5">
                <h1 className="text-center">Register</h1>
                <div className="dropdown-divider"/>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control"
                           type="text"
                           name="name"
                           placeholder="Enter Name"
                           // value={name}
                           // onChange={e => onChange(e)}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control"
                           type="email"
                           placeholder="Enter Email"
                           name="email"
                           // value={email}
                           // onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control"
                           type="password"
                           placeholder="Password"
                           name="password"
                           // value={password}
                           // onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Retype Password</label>
                    <input className="form-control"
                           type="password"
                           placeholder="Retype Password"
                           name="password2"
                           // value={password2}
                           // onChange={e => onChange(e)}
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
    )
}

export default FormVilla;