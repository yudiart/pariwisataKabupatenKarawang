import React from "react";

import Footer from "../footer/Footer";
import {Col, Container, Row} from "react-bootstrap";
import HomeLanding from "./HomeLanding";


const Home = ()=>{
  return (
      <div>

          <div>
              <HomeLanding/>
              <div className="jumbotron-fluid mt-4" style={{minHeight:'300px',height:'300px',border:'1px solid black'}}>
                  <Container>
                      <div className='mt-4'>
                        <Row>
                          <Col lg={4} style={{border:'1px solid black'}}>
                              <h1>Left</h1>
                          </Col>
                          <Col lg={8} style={{border:'1px solid black'}}>
                              <h1>Center</h1>
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

export default (Home);
