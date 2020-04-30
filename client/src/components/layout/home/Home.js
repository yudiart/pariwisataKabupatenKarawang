import React from "react";
import HomeItem from "./HomeItem";
import Footer from "../footer/Footer";
import {Col, Container, Row} from "react-bootstrap";


const Home = ()=>{
  return (
      <div>

          <div>
              <HomeItem/>
              <div className="jumbotron mt-4">
                  <Container>
                      <Row>
                          <Col lg={4} style={{border:'1px solid black'}}>
                              <h1>Left</h1>
                          </Col>
                          <Col lg={8} style={{border:'1px solid black'}}>
                              <h1>Center</h1>
                          </Col>
                      </Row>
                  </Container>
              </div>
          </div>
          <section>
              <Footer/>
          </section>
      </div>
  );
};

export default (Home);
