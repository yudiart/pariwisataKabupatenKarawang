import React, {useEffect} from "react";
import { connect } from "react-redux";
import {clearRoom, getCurrentRooms} from "../../actions/room";
import RoomForm from "./RoomForm";
import PropTypes from "prop-types";

const Rooms = () => {

    return <div>
        <RoomForm/>
    </div>
};



const mapStateToProps = state => ({
    room: state.room
});

export default connect(
    mapStateToProps,
    { getCurrentRooms}
)(Rooms);
