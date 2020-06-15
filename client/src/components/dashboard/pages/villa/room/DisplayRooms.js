import React, {Fragment, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {clearRoom, getCurrentRooms} from "../../../../../actions/room";

import './DisplayRoom.css';
import {Card, Col, Row} from "react-bootstrap";

import {Link} from "react-router-dom";

const DisplayRooms = ({
    getCurrentRooms,
    clearRoom,
    auth: { user:{avatar} },
    room:{room,rooms}
})=>{
    useEffect(() => {
        getCurrentRooms();
        clearRoom();
    }, [getCurrentRooms,clearRoom]);

    return(
        <Fragment>
            <section>
                <div className="display-rooms">
                    <Link className="navbar-brand nav-link" to={'/dashboard/room/addroom'}>Tambah Kamar</Link>
                    <div className="dropdown-divider"/>
                    <Row className="mt-3">
                        <Col sm={9}>
                            <Row>

                                    <div className="jumbotron-fluid" style={{borderRadius:'10px',height:'400px',maxHeight:'1000px'}} >
                                        <Col sm={12}>
                                            {rooms.map(item=>
                                                <div className="_DR01 mb-2" key={item._id}>
                                                    <Link to={`room/${item._id}`} className="text-dark nav-link">
                                                        <Row>
                                                            <Col sm={2}>
                                                                <div className="_DRIAll">
                                                                    <img src={item.images[0]} alt="room-images" />
                                                                </div>
                                                            </Col>
                                                            <Col sm={8}>
                                                                <div className="_DRTAll">
                                                                    <h4>{item.roomName}</h4>
                                                                    <span>Tipe Kamar : {item.tipeKamar} <i className="mdi mdi-star"></i></span>
                                                                    <p>{item.description.slice(0,150)}...</p>
                                                                </div>
                                                            </Col>
                                                            <Col sm={2}>
                                                                <div className="_DRAction">
                                                                    <Link to={`room/edit/${item._id}`} className="col-sm-12 btn btn-warning mb-1">Edit</Link>
                                                                    <Link to={`room/delete/${item._id}`} className="col-sm-12 btn btn-danger">Delete</Link>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Link>
                                                    <div className="dropdown-divider"/>
                                                </div>

                                            )}
                                        </Col>
                                    </div>

                            </Row>
                        </Col>
                    </Row>
                </div>
            </section>
        </Fragment>
    )
}
DisplayRooms.propTypes = {
    getCurrentRooms: PropTypes.func.isRequired,
    clearRoom: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    villa: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    room: state.room,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {getCurrentRooms,clearRoom}
)(DisplayRooms);