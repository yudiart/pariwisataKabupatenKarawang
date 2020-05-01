import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Col, Container, Nav, Row} from "react-bootstrap";
import RoomDisplay from "./villa/room/RoomDisplay";
import {connect} from "react-redux";

const DashboardVilla = () => {
    const [displaySetting,toggleSetting,] = useState(0);
    const [displayRoom, toggleRoom] = useState(0);
    return (
        <div className="dash-buttons">
            <div className={'row'}>
                <Container>
                    <Row>
                        <Col lg={3}>
                            <div className="jumbotron-fluid mb-4 border-right">
                                <div>
                                    <div className="p-2">
                                        <Link to={'/edit-villa'} className='nav-link'><i className='fas fa-tachometer-alt text-primary'/> Profile</Link>
                                    </div>
                                    <div className="p-2">
                                        <Link to={'/add-room'} className='nav-link'>
                                            <i className='fas fa-tachometer-alt text-primary'/>
                                            Add Room
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        <a
                                            onClick={
                                                ()=>toggleRoom(1)||
                                                toggleSetting(0)
                                            }
                                            type="button"
                                            className="nav-link">
                                            <i className='fas fa-tachometer-alt text-primary'/>
                                            Room Display
                                        </a>
                                    </div>
                                    <div className="p-2">
                                        <a
                                            onClick={
                                                ()=>toggleRoom(0)||
                                                    toggleSetting(1)
                                            }
                                            type="button"
                                            className="nav-link">
                                            <i className='fas fa-tachometer-alt text-primary'/>
                                            Settings
                                        </a>
                                    </div>
                                    <div className="p-2">
                                        <Link to={'/edit-villa'} className='nav-link'><i className='fas fa-tachometer-alt text-primary'/> Delete Account</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={9}>
                            <div className="jumbotron-fluid  " style={{minHeight:'700px'}}>
                                {displaySetting ?(
                                    <div>
                                        <i className='mdi mdi-keyboard-backspace text-danger' onClick={() => toggleSetting(0)} style={{cursor:'pointer',fontSize:'20px'}}/>Back
                                        <h1>Display Settings</h1>
                                        <img src={'https://kamar-images.s3-ap-southeast-1.amazonaws.com/1587984920102_ayana-resort-and-spa+(1).jpg'} />
                                    </div>
                                ):null}
                                {displayRoom ?(
                                    <div>
                                        <i className='mdi mdi-keyboard-backspace text-danger' onClick={() => toggleRoom(0)} style={{cursor:'pointer',fontSize:'20px'}}/>Back
                                        <RoomDisplay/>
                                    </div>
                                ):null}
                                {displaySetting === 0 && displayRoom === 0 && (
                                    <div>
                                        <div className="jumbotron">
                                            <h2>Wishlist Display</h2>
                                        </div>
                                        <div className="jumbotron">
                                            <h2>Pendapatan Total</h2>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    alert: state.alert,
    villa: state.villa,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {}
)(DashboardVilla);

