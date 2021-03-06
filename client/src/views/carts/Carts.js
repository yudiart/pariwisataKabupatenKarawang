import React, {Fragment, useEffect, useState} from 'react'
import NavigasiBar from "../../views/header/NavigasiBar";
import Data from "../../assets/Data.json";
import Cart from "../../components/cart/Cart";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {getAllRooms} from "../../actions/room";
import {getVillas} from "../../actions/villa";
import BottomBar from "../../components/bottomBar/BottomBar";
let {product:{products},cart} = Data
const Carts = ({getAllRooms,getVillas,room,villa})=>{
    const [Room, setRoom] = useState()
    const [Villa, setVilla] = useState()
    useEffect(()=>{
        getAllRooms()
        getVillas()
    },[getAllRooms,getVillas])
    useEffect(()=>{
        setRoom(room)
        setVilla(villa)
    })



    const [search, setSearch] = useState({search:''})
    return(
        <Fragment>
            <NavigasiBar setSearch={setSearch} search={search} products={products}/>
            <main>
                <Cart  room={Room} villa={Villa} />
            </main>
            <BottomBar/>
        </Fragment>
    )
}
Carts.propTypes = {
    getVillas: PropTypes.func.isRequired,
    getAllRooms: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alert:state.alert,
    room: state.room,
    villa: state.villa,
    profile: state.profile,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { setAlert, getAllRooms,getVillas }
)(Carts);
