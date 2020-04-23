import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";




const Footer = () => {
    return (
        <div className='jumbotron-fluid _1uz2h'>
            <Row>
                <Col lg={4}>
                    <div className="jumbotron">
                        <h1>footer left</h1>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="jumbotron">
                        <h1>footer Center</h1>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="jumbotron">
                        <h1>footer Right</h1>
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default Footer;
