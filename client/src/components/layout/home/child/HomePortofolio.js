import React, {Fragment, useEffect} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {getVillas} from "../../../../actions/villa";
import {getAllRooms} from "../../../../actions/room";
import {logout} from "../../../../actions/auth";

function roomsArray(rooms) {
    let i = rooms.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = rooms[i];
        rooms[i] = rooms[j];
        rooms[j] = temp;
    }
    return rooms;
}
function villasArray(villas) {
    let i = villas.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = villas[i];
        villas[i] = villas[j];
        villas[j] = temp;
    }
    return villas;
}
const HomePortofolio = ({
    getVillas,
    getAllRooms,
    villa:{villas,villa, loading},
    room:{rooms},
    auth,
})=>{
useEffect(() => {
    getVillas();
    getAllRooms();
}, [getVillas,getAllRooms]);

    const room = roomsArray(rooms);
    const Allvilla = villasArray(villas);
    return (
        <Fragment>
            <div className="_3kcKR">
                <div className='ws_Kec'>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <div className="ct_WsKec">
                                    <h1>Local Destination to Explore</h1>
                                    <p>Enjoy a wide range of villas on Vodonesia</p>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <Row>
                                    {room.slice(0,6).map(item => (
                                        <div className='ws_right'>
                                            <div id={item._id} className='img_porto2 shadow'>
                                                <div style={{backgroundImage:`url(${item.images[0]})`}} className='img'/>
                                                <div className='img-text'>
                                                    <h4><b>Teluk Jambe</b></h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                    <div className='bg_1MlOC'>
                        <Container>
                        <Row>
                            <Col lg={4}>
                                <div className='wd_LDesk'>
                                    <div className="ct_hm124">
                                        <h2>Extra space for family and friends</h2>
                                        <p>Enjoy a wide range of villas on Vodonesia</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <Row>
                                    <div className='wd_IVDesk'>
                                        {Allvilla.slice(0,1).map(item => (
                                            <div id={item._id} className='img_porto shadow'>
                                                <img src={item.images[0]} alt={item.images}/>
                                            </div>
                                        ))}
                                        <h2>Villas</h2>
                                        <p>+17.000 Villas Joining</p>
                                    </div>
                                    <div className='wd_IRDesk'>
                                        {room.slice(0,1).map(item => (
                                            <div id={item._id} className='img_porto shadow'>
                                                <img src={item.images[0]} alt={item.images}/>
                                            </div>
                                        ))}
                                        <h2>Rooms</h2>
                                        <p>+17.000 Total Rooms All Villa</p>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </div>
        </Fragment>
    )
}
HomePortofolio.propTypes ={
    getVillas: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    villa: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    villa: state.villa,
    room: state.room
});
export default connect(mapStateToProps,{getVillas,getAllRooms,logout})(HomePortofolio);