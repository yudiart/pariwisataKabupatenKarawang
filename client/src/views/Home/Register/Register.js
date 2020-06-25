import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../../assets/style/useStyle';
import {Link} from "react-router-dom";
import {setAlert} from "../../../actions/alert";
import {register} from '../../../actions/auth';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Alerts from "../../../components/Alert/Alerts";
import spinner from "../../../assets/Spinner.gif";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const Register = ({ setAlert, register,isAuthenticated,history})=>{
    const classes = useStyles();
    const [formData, setFormData] = useState({
        fullname:'',
        email: "",
        password: "",
        password2: ""
    });
    const [open, setOpen] = useState(false);
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const { fullname, email, password,password2 } = formData;

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== ''){
            if (password !== password2) {
                setAlert("Passwords do not match", "error");
            }else{
                setOpen(!open);
                register({ fullname, email, password });
            }
        }else{
            setAlert("The password must be filled in","error")
        }
    };
    const setTime =(
        setTimeout((e) => (
            history.push(`/`)
        ), 3000)
    )
    const registerIn  = (
        isAuthenticated && setTime  ?
            <Backdrop className={classes.backdrop} open={open} onClick={onSubmit}>
                <div style={{textAlign:'center'}}>
                    <h2 style={{marginBottom:'20px'}}>You are Logged in</h2>
                    <CircularProgress color="secondary" />
                </div>
            </Backdrop>
            :clearTimeout(setTime)
    )
    if (isAuthenticated){
        history.push('/dashboard')
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                {!isAuthenticated ?
                    <section>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Alerts/>
                        <form className={classes.form} noValidate onSubmit={e=> onSubmit(e)}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                value={fullname}
                                onChange={(e)=>onChange(e)}
                                label="Full Name"
                                name="fullname"
                                autoComplete="fullname"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                value={email}
                                onChange={(e)=>onChange(e)}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={password}
                                onChange={(e)=>onChange(e)}
                                label="Retype Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password2"
                                value={password2}
                                onChange={(e)=>onChange(e)}
                                label="Retype Password"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >Submit</Button>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Link to={'/'} style={{listStyle:'none',textDecoration:'none'}}>
                                        <p>Forgot Password?</p>
                                    </Link>

                                </Grid>
                                <Grid item xs={6}>
                                    <Link to={'/login'} style={{listStyle:'none',textDecoration:'none'}}>
                                        <p>you have an account ?</p>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </section>
                    :registerIn}
            </div>
        </Container>

    )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alert:state.alert
});
export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
