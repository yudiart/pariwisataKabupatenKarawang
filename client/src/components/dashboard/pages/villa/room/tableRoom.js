import React, {Fragment} from 'react';
import {Table} from "react-bootstrap";
import './tableRoom.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentRooms} from "../../../../../actions/room";
import moment from "moment";
import Spinner from "../../../../layout/Spinner";
const TableRoom =({
    room:{room,rooms,loading}
})=>{
    return (
        <Fragment>
            <h3>Rooms</h3>
            <p>Lorem ipsum dolor sit amet</p>
            <div className="dropdown-divider"/>
            {loading ? <Spinner/>:
                <div className="table-box">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Room Name</th>
                            <th>from</th>
                            <th>to</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms.map(item=>(
                            <tr key={item._id}>
                                <td><img src={item.images[0]} alt="" style={{width:'50px',height:'50px'}} className='rounded-circle'/></td>
                                <td>{item.roomName}</td>
                                <td>{moment(item.date).format('D MMM YYYY LT')}</td>
                                <td>{moment(item.date).add(4, 'days').format("D MMM YYYY LT")}</td>
                                <td>{item.harga}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            }
        </Fragment>
    )
}
TableRoom.propTypes = {
    getCurrentRooms: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
    villa: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    room: state.room,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {getCurrentRooms}
)(TableRoom);
