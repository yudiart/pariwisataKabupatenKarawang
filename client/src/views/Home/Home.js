import React, {Fragment, useEffect} from 'react';
import Navbar from "../../components/Header/nav/Navbar";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Footer from "../../components/layout/footer/Footer";
import dashStyles from "../../assets/style/dashStyles";
import Container from "@material-ui/core/Container";
import HomeDisplay from "../../components/layout/main/HomeDisplay";
import useStyle from "../../assets/style/useStyle";
import {getAllRooms} from '../../actions/room'

import {getCurrentProfile} from "../../actions/profile";
import Spinner from "../../assets/Spinner";
import Header from "../../components/Header/Header";
import {getVillas} from "../../actions/villa";

const Home = ({
    auth,
    getVillas,
    getAllRooms,
    getCurrentProfile,
    room: {rooms},
    profile,
    villa,
    loading
})=>{
useEffect(()=>{
    getVillas()
    getAllRooms()
    getCurrentProfile()
},[getCurrentProfile,getAllRooms,getVillas])

    const classess = dashStyles();
    const classes = useStyle();

    return (auth && auth.loading && loading ? <Spinner/>:
        <Fragment>
            <Navbar/>
            <main className={classess.content}>
                <Header classes={classes}/>
                <Container>
                    <HomeDisplay room={rooms} profile={profile} villa={villa}/>
                </Container>

            </main>
            <Footer/>
        </Fragment>
    )
}
Home.propTypes = {
    isAuthenticated: PropTypes.bool,
    getVillas: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getAllRooms: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    room:state.room,
    profile: state.profile,
    loading: state.profile.loading
});

export default connect(
    mapStateToProps,
    {
        getCurrentProfile,
        getAllRooms,
        getVillas
    }
)(Home);
