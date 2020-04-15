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
    covids:{
        covids:{
            confirmed,
            activeCare,
            deceased,
            recovered,
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
                {loading ? <Spinner/>:
                <div className='text-center mt-4'>
                    <Row>
                        <Col md={3} className="text-center">
                            <p style={{fontSize:'20px'}}>Terkonfirmasi</p>
                            <div className="jumbotron">
                                    <h1 className='text-primary text-center'>
                                        {confirmed}

                                    </h1>

                            </div>
                        </Col>
                        <Col md={3} className="text-center">
                            <p style={{fontSize:'20px'}}>Dalam Perawatan</p>
                            <div className="jumbotron">
                                <h1 className='text-warning text-center'>
                                    {activeCare}

                                </h1>

                            </div>
                        </Col>
                        <Col md={3} className="text-center">
                            <p style={{fontSize:'20px'}}>Sembuh</p>
                            <div className="jumbotron">
                                <h1 className='text-success text-center'>
                                    {recovered}

                                </h1>

                            </div>
                        </Col>
                        <Col md={3} className="text-center">
                            <p style={{fontSize:'20px'}}>Meninggal</p>
                            <div className="jumbotron">
                                <h1 className='text-danger text-center'>
                                    {deceased}

                                </h1>

                            </div>
                        </Col>
                    </Row>
                    <div className='jumbotron'>
                        <h2 className='font-weight-bold'>LAST UPDATED</h2>
                        <h3><Moment format="LL">{metadata && metadata.lastUpdatedAt}</Moment></h3>
                        <p>Sumber <Link to='https://kawalcovid19.id/'>Kawal Covid 19</Link></p>
                    </div>
                </div>
                }
            </div>
        </Fragment>
    );
};

Covids.propTypes = {
    getCovid: PropTypes.func.isRequired,
    covids: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    covids: state.covids
});

export default connect(mapStateToProps,{ getCovid })(Covids);
