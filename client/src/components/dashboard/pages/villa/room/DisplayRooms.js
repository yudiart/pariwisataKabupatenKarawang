import React, {Fragment, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentRooms} from "../../../../../actions/room";

import './DisplayRoom.css';
import {Col, Row} from "react-bootstrap";
import TableRoom from "./tableRoom";
const DisplayRooms = ({
    getCurrentRooms,
    auth: { user },
    room:{room,rooms}
})=>{
    useEffect(() => {
        getCurrentRooms();
    }, [getCurrentRooms]);
    return(
        <Fragment>
            <div className="display-rooms">
                <Row>
                    <Col lg={12}>
                        <div className="jumbotron-fluid _1uz2h">
                            <Row>
                                <Col lg={4}>
                                    <div className="jumbotron">
                                        <h2>Box 2</h2>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="jumbotron ">
                                        <h2>Box 2</h2>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="jumbotron">
                                        <h2>Box 2</h2>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="jumbotron-fluid _1uz2h">
                            <TableRoom/>
                        </div>
                    </Col>
                </Row>
            </div>
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