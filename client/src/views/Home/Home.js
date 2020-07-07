import React, {Fragment, useEffect} from 'react';
import Navbar from "../../components/Header/nav/Navbar";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Footer from "../../components/layout/footer/Footer";
import dashStyles from "../../assets/style/dashStyles";
import Container from "@material-ui/core/Container";
import HomeDisplay from "../../components/layout/main/HomeDisplay";
import Grid from "@material-ui/core/Grid";
import useStyle from "../../assets/style/useStyle";
import Paper from "@material-ui/core/Paper";
import {getCurrentProfile} from "../../actions/profile";
import {Redirect} from "react-router";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Spinner from "../../assets/Spinner";

const Home = ({
    auth,
    isAuthenticated,
    getCurrentProfile,
    profile:{profile,loading}}
    )=>{
useEffect(()=>{
    getCurrentProfile()
},[getCurrentProfile])

    const classess = dashStyles();
    const classes = useStyle();

    return (auth && auth.loading && loading ? <Spinner/>:
        <Fragment>
            <Navbar/>
            <main className={classess.content}>
                <Paper className={classes.backgroundHeader} elevation={0}>
                    <Container>
                        <Grid item xs={12} lg={12} md={12}>
                            <Grid container>
                                <Grid item xs={12} lg={3} md={3} style={{padding:'10px'}}>
                                    <Paper className={classes.headerImage}>
                                        <h1>Villa's</h1>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} lg={3} md={3} style={{padding:'10px'}}>
                                    <Paper className={classes.headerImage}>
                                        <h1>Karawang Travel</h1>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} lg={3} md={3} style={{padding:'10px'}}>
                                    <Paper className={classes.headerImage}>
                                        <h1>Culture</h1>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} lg={3} md={3} style={{padding:'10px'}}>
                                    <Paper className={classes.headerImage}>
                                        <h1>Food & Drinks</h1>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>

                <Container>
                    <HomeDisplay/>

                </Container>

            </main>
            <Footer/>
        </Fragment>
    )
}
Home.propTypes = {
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    getCurrentProfile: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    profile: state.profile,
    alerts:state.alert
});

export default connect(
    mapStateToProps,
    {getCurrentProfile}
)(Home);