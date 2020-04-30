import React, {useEffect} from "react";
import Footer from "../footer/Footer";
import {Card, Col, Container, Row} from "react-bootstrap";
import HomeLanding from "./HomeLanding";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../../actions/profile";
import {logout} from "../../../actions/auth";
import {getVillas} from "../../../actions/villa";
import {getAllRooms} from "../../../actions/room";


const Home = ({
    logout,
    getCurrentProfile,
    getVillas,
    getAllRooms,
    villa:{villas,villa},
    room:{rooms},
    auth: { isAuthenticated, user},
    profile: { profile, loading }
})=>{
useEffect(() => {
    getCurrentProfile();
    getVillas();
    getAllRooms();
}, [getCurrentProfile,getVillas,getAllRooms]);
  return (
      <div>

          <div>
              <HomeLanding/>
              <div className="jumbotron-fluid mt-4" style={{minHeight:'300px',border:'1px solid black'}}>
                  <Container>
                      <div className='mt-4'>
                        <Row>
                          <Col lg={4} style={{border:'1px solid black'}}>
                              <div>
                                <h1>Villa</h1>
                                <p>Lorem ipsum dolor sit amet.</p>
                              </div>
                          </Col>
                          <Col lg={8} style={{border:'1px solid black'}}>
                              <div>
                                  {villas.map(item =>(
                                      <div key={item._id}>
                                          <Card style={{ width: '18rem' }}>
                                              <Card.Img variant="top" src="holder.js/100px180" />
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
      </div>
  );
};
Home.propTypes ={
    getCurrentProfile: PropTypes.func.isRequired,
    getVillas: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
    villa: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    villa: state.villa,
    profile: state.profile,
    room: state.room
});

export default connect(
    mapStateToProps,
    { getCurrentProfile,getVillas,getAllRooms,logout }
)(Home);
