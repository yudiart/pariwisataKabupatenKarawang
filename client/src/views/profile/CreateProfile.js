import React, {Fragment, useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {createProfile, getCurrentProfile} from "../../actions/profile";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Spinner from "../../assets/Spinner";
import Alerts from "../../components/Alert/Alerts";
const CreateProfile = ({
    auth:{
        user,
        loading,
        isAuthenticated
    },
    profile,
    createProfile,
    getCurrentProfile,
    history}
)=>{
    const [formData, setFormData] = useState({
        fullname: "",
        contact: "",
        location: "",
        status: "",
        bio: "",
        twitter: "",
        facebook: "",
        instagram: ""
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        fullname,
        contact,
        location,
        status,
        bio,
        twitter,
        facebook,
        instagram,

    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };

    const useStyle = makeStyles((theme) => ({
        content: {
            flexGrow: 1,
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(2),
        },
        background:{
            background: theme.palette.secondary.light,
            marginTop: theme.spacing(0),
            borderRadius:'0',
            minHeight:'100px'
        },
        textStyle:{
            color: "#fff",
            fontSize: 30,
            textAlign:"center",
            justifyContent:"center"
        },
        textField:{
            width:"100%",
            marginTop:10
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(1),
        },
    }))

    const classes = useStyle();
    useEffect(()=>{
        getCurrentProfile()
    },[getCurrentProfile])

    if (isAuthenticated === false &&  profile && profile.profile !== null){
        return <Redirect to={'/'}/>
    }
    const role =(
            user && user.role !== 'villa' ?
                <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="status"
                        value={status}
                        onChange={e => onChange(e)}
                        label="Status"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Menikah'}>Menikah</MenuItem>
                        <MenuItem value={'Belum Menikah'}>Belum Menikah</MenuItem>
                    </Select>
                </FormControl> :null
        )

    const setTime = (
        setTimeout((e) => (
            profile && profile.profile !== null ? history.push('/'):null
        ), 3000)
    )
    return(
        <Fragment>

            {setTime ? loading && profile && profile.loading === true? <Spinner/>:
            <main>
                <Paper elevation={0} className={classes.background}>
                    <Container>
                        <Grid item xs={12} lg={12} md={12}>
                            <Grid container>
                                <Grid item xs={12} lg={12} md={12} style={{padding:'10px'}}>
                                    <h1 className={classes.textStyle}>Create Profile's</h1>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>

                <Container>
                    <Grid item xs={12} md={12} lg={12} style={{marginTop:20}}>
                        <Grid container>
                            <Grid item lg={3}>

                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Alerts/>
                                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e)=>onSubmit(e)}>
                                    <TextField
                                        className={classes.textField}
                                        id="standard-basic"
                                        label={user&&user.role === 'villa'?'Villa Name':'Fullname'}
                                        variant="outlined"
                                        name="fullname"
                                        value={fullname}
                                        onChange={e => onChange(e)}
                                    />
                                    <TextField
                                        className={classes.textField}
                                        id="standard-basic"
                                        label="contact"
                                        variant="outlined"
                                        name="contact"
                                        value={contact}
                                        onChange={e => onChange(e)}
                                    />
                                    <TextField
                                        className={classes.textField}
                                        id="standard-basic"
                                        label="location"
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        rowsMax={5}
                                        name="location"
                                        value={location}
                                        onChange={e => onChange(e)}

                                    />
                                    <TextField
                                        className={classes.textField}
                                        id="standard-basic"
                                        label="bio"
                                        variant="outlined"
                                        name="bio"
                                        value={bio}
                                        onChange={e => onChange(e)}
                                    />
                                    {role}

                                {displaySocialInputs && (
                                    <Fragment>
                                        <FormControl className={classes.textField}>
                                            <InputLabel htmlFor="input-with-icon-adornment">Twitter</InputLabel>
                                            <Input
                                                id="input-with-icon-adornment"
                                                name="twitter"
                                                value={twitter}
                                                onChange={e => onChange(e)}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <TwitterIcon/>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <FormControl className={classes.textField}>
                                            <InputLabel htmlFor="input-with-icon-adornment">Facebook</InputLabel>
                                            <Input
                                                id="input-with-icon-adornment"
                                                name="facebook"
                                                value={facebook}
                                                onChange={e => onChange(e)}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <FacebookIcon/>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <FormControl className={classes.textField}>
                                            <InputLabel htmlFor="input-with-icon-adornment">Instagram</InputLabel>
                                            <Input
                                                id="input-with-icon-adornment"
                                                name="instagram"
                                                value={instagram}
                                                onChange={e => onChange(e)}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <InstagramIcon/>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Fragment>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type='submit'
                                        size="small"
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        size="small"
                                        className={classes.button}
                                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                                    >
                                        Add Socials
                                    </Button>
                                </form>
                            </Grid>
                            <Grid item lg={3}>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </main>:clearTimeout(setTime)}
        </Fragment>
    )
}
CreateProfile.propTypes = {
    setAlert: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    alerts:state.alert
});

export default connect(
    mapStateToProps,
    {createProfile,getCurrentProfile}
)(CreateProfile);