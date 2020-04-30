import React  from "react";
import { connect } from "react-redux";
import { getCurrentRooms } from "../../actions/room";
import RoomForm from "./RoomForm";

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
    { getCurrentRooms }
)(Rooms);
