import React, {Fragment, useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import useStyles from "../../../../assets/style/useStyle";
import dashStyles from "../../../../assets/style/dashStyles";
import {login} from "../../../../actions/auth";
import {useMediaQuery, useTheme} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Alerts from "../../../Alert/Alerts";
import {Redirect} from "react-router";




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Login = ({login,isAuthenticated})=>{
    const classes = useStyles();
    const classess = dashStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    let a = JSON.parse(localStorage.getItem('RememberMe'));
    const [isChecked, setChecked] = useState(a !== null ? a.isChecked : false);
    const onChangeCheckbox = e => {setChecked(e.target.checked)}
    const [formData, setFormData] = useState({
        email: a!==null?a.email:"",
        password: a!==null?a.password:"",
    });
    const [open, setOpen] = React.useState(Boolean);
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const { email, password } = formData;
    const onSubmit = async e => {
        e.preventDefault();
        return <Redirect to={'/dashboard'}/>
        setTimeout(() => (
            setOpen(open),
            login({email,password,isChecked})
        ), 3000)
    };
    //Dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const formDialog =(
        <Dialog
            open={open}
            fullScreen={fullScreen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <Alerts/>
            <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                {!isAuthenticated ?
                <DialogContent>
                    <DialogContentText>
                        Lorem ipsum dolor sit amet ngeri.
                    </DialogContentText>
                    <Alerts/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        id='Email'
                        label="Email Address"
                        value={email}
                        onChange={(e)=>onChange(e)}
                        name="email"
                        autoComplete="email"/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id='Password'
                        required
                        fullWidth
                        value={password}
                        onChange={(e)=>onChange(e)}
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value={isChecked} color="primary"  checked={isChecked}  onChange={onChangeCheckbox}/>}
                        label="Remember me"
                    />
                </DialogContent>:<loggedin/>}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant="contained"
                        color="secondary"
                        className={classess.submit}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )

    return(
        <Fragment>
            <Button variant="text" color="inherit" onClick={handleClickOpen}>
                Login
            </Button>
            {open ? formDialog :null}
        </Fragment>
    )
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    profile:state.profile,
});

export default connect(
    mapStateToProps,
    {login }
)(Login);
