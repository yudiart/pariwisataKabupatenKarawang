import React from'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import FooterLeft from "./FooterLeft";
import FooterCenter from "./FooterCenter";
import FooterRight from "./FooterRight";


const FooterItem = ()=>{
    return(
        <div className='footer'>

            <div className="container">
                <Row>
                    <Col lg={4}>
                        <FooterLeft/>
                    </Col>
                    <Col lg={4}>
                        <FooterCenter/>
                    </Col>
                    <Col lg={4}>
                        <FooterRight/>
                    </Col>
                </Row>
            </div>
        </div>
    )

}

export default FooterItem;
