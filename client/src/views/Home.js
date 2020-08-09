import React, {Fragment, useEffect, useState} from 'react'
import NavigasiBar from "../views/header/NavigasiBar";
import Footer from "../components/footer/Footer";
import Data from '../assets/Data.json'
import Main from "./Main";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getAllRooms} from "../actions/room";
import {getVillas} from "../actions/villa";
import {getCurrentProfile} from "../actions/profile";
import Spinner from "../assets/Spinner";
import BottomBar from "../components/bottomBar/BottomBar";

let {product:{products,promo}} = Data
const Home =({getAllRooms,isAuthenticated,auth, getVillas,room,villa})=>{
    useEffect(()=>{
        getAllRooms()
        getVillas()
    },[getAllRooms,getVillas])
    const [search,setSearch] = useState({
        search:''
    })


    return(
        <Fragment>
            {room.loading && villa.loading?
                <div className="loadingacount">
                    <Spinner/>
                </div>
            :
                <>
                    <NavigasiBar setSearch={setSearch} search={search} products={products}/>
                    <Main products={products} promo={promo} rooms={room.rooms}/>
                    <BottomBar/>
                    <Footer/>
                </>
            }
        </Fragment>
    )
}
Home.propTypes = {
    getVillas: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getAllRooms: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    loading: state.profile.loading,
    isAuthenticated: state.auth.isAuthenticated,
    alert:state.alert,
    villa:state.villa,
    room: state.room,
    profile: state.profile,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    {getCurrentProfile, getAllRooms,getVillas}
)(Home);


