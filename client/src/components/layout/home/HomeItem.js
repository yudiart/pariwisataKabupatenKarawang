import React from "react";
import Footer from "../footer/Footer";
import HomeLanding from "./HomeLanding";
import {Col, Container, Row} from "react-bootstrap";

const HomeItem = ()=>{
    return (
        <div>
            <div>
                <HomeLanding/>
                <div className="jumbotron">
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


export default (HomeItem);
