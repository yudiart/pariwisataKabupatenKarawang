import React, {Fragment, useEffect} from 'react';
import PropTypes from "prop-types";
import defaultImage from '../../../../assets/default.jpg';
import {connect} from "react-redux";
import {getCurrentRooms} from "../../../../actions/room";
import Spinner from "../../../layout/Spinner";


const RoomDisplay = ({
     getCurrentRooms,
     room:{rooms,loading}
})=>{
    useEffect(() => {
        getCurrentRooms();
    }, [getCurrentRooms]);




            return loading ? (
            <Spinner />
            ) : (
            <Fragment>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Room Name</th>
                        <th scope="col">Harga</th>
                        <th scope="col">Limit</th>
                        <th scope="col">Tipe Kamar</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms.map(room => (



                        <tr key={room._id}>
                            {room.images.length > 0 ?
                                <td className='text-center'><img src={room.images[0]} alt={room.images} style={{width:'50px',height:'50px'}}/></td>
                                :
                                <td className='text-center'>
                                    <img src={defaultImage} alt="" style={{width:'50px',height:'50px'}}/>
                                </td>

                            }
                            <td>{room.roomName}</td>
                            <td>{room.harga}</td>
                            <td>{room.limit}</td>
                            <td>{room.tipeKamar}</td>
                            <td>
                                <a href={'/'}>Edit</a>
                                <a href={'/'}>Delete</a>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>

            </Fragment>
            );
}
RoomDisplay.propTypes = {
    getCurrentRooms: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired,
    room: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    room: state.room,
});

export default connect(
    mapStateToProps,
    {getCurrentRooms}
)(RoomDisplay);