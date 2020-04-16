import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getCovid} from '../../actions/covid';
import Spinner from "../layout/Spinner";
import {Col, Row} from "react-bootstrap";
import Moment from "react-moment";
import {Link} from "react-router-dom";

const Covids = ({
    getCovid,
    covid:{covid,
        covid:{
            confirmed,
            activeCare,
            recovered,
            deceased,
            metadata
        }
},loading}) => {
    useEffect(() => {
        getCovid();
    }, [getCovid]);
    return (
        <Fragment>
            <div className="jumbotron-fluid text-center">
                <h4>Data Corona Virus di indonesia</h4>
                {covid.lentgh === 0 ? <Spinner/>:
                <div className='text-center mt-4'>
                    <Row>
                        <Col md={3} className="text-center">
                            <p style={{fontSize:'20px'}}>Terkonfirmasi</p>
                            <div className="jumbotron bg-primary">
                                <h1 className='text-light text-center'>
                                    {confirmed}
                                </h1>
                            </div>
                        </Col>
                        <Col md={3} className="text-center">
                            <p style={{fontSize:'20px'}}>Dalam Perawatan</p>
                            <div className="jumbotron bg-warning">
                                <h1 className='text-light text-center'>
                                    {activeCare}

                                </h1>

                            </div>
                        </Col>
                        <Col md={3} className="text-center">
                            <p style={{fontSize:'20px'}}>Sembuh</p>
                            <div className="jumbotron bg-success">
                                <h1 className='text-light text-center'>
                                    {recovered}

                                </h1>

                            </div>
                        </Col>
                        <Col md={3} className="text-center">
                            <p style={{fontSize:'20px'}}>Meninggal</p>
                            <div className="jumbotron bg-danger">
                                <h1 className='text-light text-center'>
                                    {deceased}

                                </h1>

                            </div>
                        </Col>
                    </Row>
                    <div className='jumbotron'>
                        <h2 className='font-weight-bold'>LAST UPDATED</h2>
                        <h3><Moment startOf="hour" fromNow>{metadata && metadata.lastUpdatedAt}</Moment></h3>
                        <p>Sumber <a href='https://kawalcovid19.id/' target='_blank'>Kawal Covid 19</a></p>
                    </div>
                </div>
                }
            </div>
        </Fragment>
    );
};

Covids.propTypes = {
    getCovid: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    covid: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    covid: state.covid
});

export default connect(mapStateToProps,{ getCovid })(Covids);
