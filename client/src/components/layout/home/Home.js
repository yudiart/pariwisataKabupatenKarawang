import React, {Fragment, useEffect} from "react";
import Footer from "../footer/Footer";
import {Card, Col, Container, Row} from "react-bootstrap";
import HomeLanding from "./HomeLanding";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../../actions/auth";
import {getVillas} from "../../../actions/villa";
import {getAllRooms} from "../../../actions/room";
import Navbar from "../navbar/Navbar";
import Spinner from "../Spinner";


const Home = ({
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
  return (
      loading || rooms.loading === true ? <Spinner/> :
          auth && auth.loading === true ? <Spinner/> :
          <Fragment>
              <Navbar/>
              <div>
                  <HomeLanding/>
                  <div className="jumbotron-fluid mt-4" style={{minHeight: '900px', border: '1px solid black'}}>
                      <Container>
                          <div className='mt-4'>
                              <Row>
                                  <Col lg={4} style={{border: '1px solid black'}}>
                                      <div>
                                          <h1>Villa</h1>
                                          <p>Lorem ipsum dolor sit amet.</p>
                                      </div>
                                  </Col>
                                  <Col lg={8} style={{border: '1px solid black'}}>
                                      <div>
                                          {villas.map(item => (
                                              <div key={item._id}>
                                                  <Card style={{width: '18rem'}}>
                                                      <div className='card-img-top'>
                                                          <img src={item.images[0]} alt={item.images}
                                                               style={{width: '18rem'}}/>
                                                      </div>
                                                      <Card.Body>
                                                          <Card.Title>{item._id}</Card.Title>
                                                          <Card.Text>
                                                              {item.bio}
                                                          </Card.Text>
                                                          <button className='btn btn-primary'>Go Shomewhere</button>
                                                      </Card.Body>
                                                  </Card>
                                              </div>
                                          ))}
                                      </div>
                                  </Col>
                              </Row>
                          </div>
                      </Container>
                  </div>
              </div>
              <section>
                  <Footer/>
              </section>
          </Fragment>

  );
};
Home.propTypes ={
    getVillas: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
    villa: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    villa: state.villa,
    room: state.room
});

export default connect(
    mapStateToProps,
    { getVillas,getAllRooms,logout }
)(Home);
