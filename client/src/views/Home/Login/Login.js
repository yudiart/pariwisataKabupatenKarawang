import React, {useEffect, useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Image from '../../../assets/login.svg'
import {login} from '../../../actions/auth';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {setAlert} from "../../../actions/alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useHistory} from "react-router";

const Login = ({login,isAuthenticated})=>{
    let history = useHistory()
    let a = JSON.parse(localStorage.getItem('RememberMe'));
    const [isChecked, setChecked] = useState(a !== null ? a.isChecked : false);
    const onChangeCheckbox = e => {setChecked(e.target.checked)}
    const [formData, setFormData] = useState({
        email: a!==null?a.email:"",
        password: a!==null?a.password:"",
    });

    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = useState(0)
    const handleShowPassword = (e)=>{
        setShowPassword(!showPassword)
    }
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const { email, password } = formData;
    const onSubmit = async e => {
        e.preventDefault();
        setOpen(!open)
        login({email,password,isChecked})
    };

    const setTime =()=> {
        setTimeout((e) => (
            isAuthenticated ? history.push(`/`) : null
        ), 3000)
    }

    useEffect(()=>{
        setTime()
    },[setTime])
    const loggedin  = (
        isAuthenticated && setTime  ?
            <div className="input-group">
                <button>
                    <CircularProgress style={{width:'20px',height:'20px',color:'#fff'}} />
                </button>
            </div>
            :clearTimeout(setTime)
    )

    return (
            <div className="auth">
                <div className="auth__wrapper">
                    <div className="header">
                        <h4>Pariwisata</h4>
                    </div>
                    <div className="btn-back"  onClick={()=>{history.goBack()}}>
                        <i className="material-icons mdc-icon-button__icon" >keyboard_backspace</i>Back
                    </div>
                    <div className="auth-body">
                        <div className="info">
                            <div className="image-preview">
                                <img
                                    src={Image}
                                    alt="Image"/>
                            </div>
                        </div>
                        <form className="form-auth" noValidate onSubmit={e => onSubmit(e)}>
                            <div className="box-auth">
                                <div className="header-form">
                                    <h4>Masuk</h4>
                                    <p>Belum punya akun Pariwisata ? <Link to={'/register'} className="btn-link-auth">Daftar sekarang</Link></p>

                                </div>
                                <div className="input-group">
                                    <input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e)=>onChange(e)}
                                        name="email"
                                        autoComplete="email"
                                        placeholder="username"
                                    />
                                </div>
                                <div className="input-group">
                                    <input
                                        type={!showPassword?"password":"text"}
                                        name='password'
                                        value={password}
                                        onChange={(e)=>onChange(e)}
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <i className="material-icons mdc-icon-button__icon" onClick={handleShowPassword}>{!showPassword?"visibility":"visibility_off"}</i>
                                </div>
                                <FormControlLabel
                                    control={<Checkbox value={isChecked} color="primary"  checked={isChecked}  onChange={onChangeCheckbox}/>}
                                    label="Remember me"
                                />
                                {!isAuthenticated?
                                    <div className="input-group">
                                        <button type='submit'>Login</button>
                                    </div>
                                :loggedin}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    alerts:state.alert
});

export default connect(
    mapStateToProps,
    {setAlert, login }
)(Login);
