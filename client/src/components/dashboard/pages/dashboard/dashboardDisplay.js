import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Col, Row, Table} from "react-bootstrap";
import TableRoom from "../villa/room/tableRoom";

import {getCurrentRooms} from "../../../../actions/room";

import './dashboardDisplay.css';
const DashboardDisplay = ({
    getCurrentRooms,
    auth:{user},
    room:{rooms,loading}
})=>{
    useEffect(() => {
        getCurrentRooms();
    }, [getCurrentRooms]);

        const arr = rooms.filter(item=>( item._id));
        console.log(arr.length)
    return(
        <Fragment>
            <div>
                {user && user.role === 'admin'?
                    <h1>Admin</h1>
                :null}
                {user&&user.role ==='villa'?
                    <Fragment>
                        <div className="display-rooms">
                            <Row>
                                <Col lg={2}>
                                    <div className="card bg-gradient text-white" style={{border:'none'}}>
                                        <div className="card-body">
                                            <h5 className='card-title'>Rooms Total</h5>
                                            <h1 className="card-text" style={{fontSize:'60px'}}><b>{arr.length}</b></h1>
                                            <p className="card-text"><small className="text-white">Last
                                                updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={2}>
                                    <div className="card bg-gradient text-white" style={{border:'none'}}>
                                        <div className="card-body">
                                            <h5 className='card-title'>Rooms Total</h5>
                                            <h1 className="card-text" style={{fontSize:'60px'}}><b>{arr.length}</b></h1>
                                            <p className="card-text"><small className="text-white">Last
                                                updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="card bg-gradient text-white" style={{border:'none'}}>
                                        <div className="card-body">
                                            <h5 className='card-title'>Price Total</h5>
                                            <h1 className="card-text" style={{fontSize:'60px'}}><b>Rp.15.000.000</b></h1>
                                            <p className="card-text"><small className="text-white">Last
                                                updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="card bg-gradient text-white" style={{border:'none'}}>
                                        <div className="card-body">
                                            <h5 className='card-title'>Price Total</h5>
                                            <h1 className="card-text" style={{fontSize:'60px'}}><b>Rp.15.000.000</b></h1>
                                            <p className="card-text"><small className="text-white">Last
                                                updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <div className="jumbotron-fluid _1uz2h mt-5">
                                        <TableRoom/>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="jumbotron-fluid _1uz2h mt-5">
                                        <TableRoom/>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Fragment>
                :null}
            </div>
        </Fragment>
    )
}

DashboardDisplay.propTypes={
    getCurrentRooms: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth,
    room: state.room
})
export default connect(mapStateToProps,{getCurrentRooms}) (DashboardDisplay);