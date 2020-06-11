import React, {Fragment, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentRooms} from "../../../../../actions/room";

import './DisplayRoom.css';
import {Card, Col, Row} from "react-bootstrap";

import {Link} from "react-router-dom";

const DisplayRooms = ({
    getCurrentRooms,
    auth: { user:{avatar} },
    room:{room,rooms}
})=>{
    useEffect(() => {
        getCurrentRooms();
    }, [getCurrentRooms]);
    let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac diam non ex accumsan consectetur Integer euismod eu libero bibendum tincidunt. Quisque accumsan quam dolor, at laoreet lorem semper eu.Praesent mattis pharetra placerat. Maecenas ultrices tellus et mi vehicula viverra sit amet sed nibh.Morbi dignissim erat vel lectus posuere, ac consectetur sapien aliquam.Morbi commodo fermentum enim facilisis tempor. Pellentesque faucibus dignissim convallis."


    return(
        <Fragment>
            <section>
                <div className="display-rooms">
                    <Link className="navbar-brand nav-link" to={'/dashboard/room/addroom'}>Tambah Kamar</Link>
                    <div className="dropdown-divider"/>
                    <Row className="mt-3">
                        <Col sm={9}>
                            <Row>
                                <div className="jumbotron-fluid" style={{borderRadius:'10px',height:'400px',maxHeight:'1000px;'}}>
                                    <Col sm={12}>
                                        <div className="_DR01 mb-2">
                                            <Row>
                                                <Col sm={2}>
                                                    <div className="_DRIAll">
                                                        <img src={process.env.PUBLIC_URL + '/uploads/1.png'} alt=""/>
                                                    </div>
                                                </Col>
                                                <Col sm={8}>
                                                    <div className="_DRTAll">
                                                        <h4>Title</h4>
                                                        <p>{text.slice(0,200)}...</p>
                                                    </div>
                                                </Col>
                                                <Col sm={2}>
                                                    <div className="_DRAction">
                                                        <a href='#' className="col-sm-12 btn btn-warning mb-1">Edit</a>
                                                        <a href='#' className="col-sm-12 btn btn-danger">Delete</a>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
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
    {getCurrentRooms}
)(DisplayRooms);