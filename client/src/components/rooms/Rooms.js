import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentRooms } from "../../actions/room";
import Spinner from "../layout/Spinner";
import RoomItem from "./RoomItem";
import RoomForm from "./RoomForm";

const Rooms = ({ getCurrentRooms}) => {

    return <div>
        <RoomForm/>
    </div>
};

Rooms.propTypes = {

};

const mapStateToProps = state => ({
    room: state.room
});

export default connect(
    mapStateToProps,
    { getCurrentRooms }
)(Rooms);
