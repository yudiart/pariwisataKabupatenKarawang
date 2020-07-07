import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import useStyles from '../../../assets/style/useStyle';
import {login} from '../../../actions/auth';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {setAlert} from "../../../actions/alert";
import Alerts from "../../../components/Alert/Alerts";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import dashStyles from "../../../assets/style/dashStyles";

const Login = ({login,isAuthenticated,history})=>{

    const classes = useStyles();
    const classess = dashStyles();
    let a = JSON.parse(localStorage.getItem('RememberMe'));
    const [isChecked, setChecked] = useState(a !== null ? a.isChecked : false);
    const onChangeCheckbox = e => {setChecked(e.target.checked)}
    const [formData, setFormData] = useState({
        email: a!==null?a.email:"",
        password: a!==null?a.password:"",
    });
    const [open, setOpen] = React.useState(false);

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const { email, password } = formData;
    const onSubmit = async e => {
        e.preventDefault();
        setOpen(!open)
        login({email,password,isChecked})
    };

    const setTime =(
        setTimeout((e) => (
            isAuthenticated ? history.push(`/`):null
        ), 3000)
    )
    const loggedin  = (
        isAuthenticated && setTime  ?
            <Backdrop className={classes.backdrop} open={open} onClick={onSubmit}>
                <div style={{textAlign:'center'}}>
                    <h2 style={{marginBottom:'20px'}}>You are Logged in</h2>
                    <CircularProgress color="secondary" />
                </div>
            </Backdrop>
            :clearTimeout(setTime)
    )

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Alerts/>
                {!isAuthenticated?
                    <Typography component="h1" variant="h5" style={{marginBottom:'30px'}}>
                        Login
                    </Typography>:null
                }
                {!isAuthenticated ?
                    <section>

                        <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    id="email"
                                    label="Email Address"
                                    value={email}
                                    onChange={(e)=>onChange(e)}
                                    name="email"
                                    autoComplete="email"/>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={password}
                                    onChange={(e)=>onChange(e)}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value={isChecked} color="primary"  checked={isChecked}  onChange={onChangeCheckbox}/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classess.submit}
                                >
                                    Submit
                                </Button>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Link to={'/'} style={{listStyle:'none',textDecoration:'none'}}>
                                            <p>Forgot Password?</p>
                                        </Link>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Link to={'/register'} style={{listStyle:'none',textDecoration:'none'}}>
                                            <p>Don't have an account ?</p>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </section>
                    :loggedin}
            </div>
            <Box mt={8}>

            </Box>
        </Container>
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
