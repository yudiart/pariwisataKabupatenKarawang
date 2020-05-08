import React, {Fragment, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentRooms} from "../../../../../actions/room";
import {Button, Card, Col, Row} from "react-bootstrap";

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
            <div className='jumbotron'>
                <Row>
                   <Col lg={6}>
                       {rooms.map(item=>(
                           <div className='horizontal' key={item._id}>
                               <Card style={{ width: '18rem' }}>
                                   <Card.Img variant="top" src={item.images[0]} />
                                   <Card.Body>
                                       <Card.Title>Card Title</Card.Title>
                                       <Card.Text>
                                           Some quick example text to build on the card title and make up the bulk of
                                           the card's content.
                                       </Card.Text>
                                       <Button variant="primary">Go somewhere</Button>
                                   </Card.Body>
                               </Card>
                           </div>
                       ))}
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