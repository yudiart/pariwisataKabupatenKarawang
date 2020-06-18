import React, {Fragment, useEffect} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentRooms} from "../../../../actions/room";
import {getCurrentVilla, getLikes} from "../../../../actions/villa";
import Moment from "react-moment";
import FormVilla from "../../villa/villaProfile/formVilla";


const DashboardDisplayVillaItem = ({
    getCurrentVilla,
    getCurrentRooms,
    getLikes,
    auth:{user},
    villa:{villa,likes,loading},
    room:{rooms}
})=>{
useEffect(() => {
    getCurrentVilla();
    getCurrentRooms();
    getLikes();
}, [getCurrentRooms,getCurrentVilla,getLikes]);

    let i =1 ;
    const arr = rooms.filter(item=>( item._id));
    return(
        <Fragment>
            {loading === false || user || user.loading === false || villa !== null ?
            <Col lg={6}>
                <FormVilla/>
            </Col>

            :
                <div className="display-rooms">
                    <Row>
                        <Col lg={3}>
                            <div className="card bg-gradient text-white" style={{border:'none'}}>
                                <div className="card-body">
                                    <h5 className='card-title'>Rooms Total</h5>
                                    <h1 className="card-text" style={{fontSize:'60px'}}><b>{arr.length}</b></h1>
                                    <p className="card-text"><small className="text-white">Last
                                        updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="card bg-gradient text-white" style={{border:'none'}}>
                                <div className="card-body">
                                    <h5 className='card-title'>Price /Month</h5>
                                    <h1 className="card-text" style={{fontSize:'60px'}}><b>Rp.5.000.000</b></h1>
                                    <p className="card-text"><small className="text-white">Last
                                        updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="card bg-gradient text-white" style={{border:'none'}}>
                                <div className="card-body">
                                    <h5 className='card-title'>Price Total</h5>
                                    <h1 className="card-text" style={{fontSize:'60px'}}><b>Rp.15.000.000</b></h1>
                                    <p className="card-text"><small className="text-white">Last
                                        updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} xs={12} md={6}>
                            <div className=" mt-5">
                                <Card className='jumbotron-group'>
                                    <Image variant="top" src={process.env.PUBLIC_URL + '/uploads/1.png'} style={{padding:'10px',width:'70%',marginLeft:'15%',marginRight:'15%'}} roundedCircle/>
                                    <Card.Body className='text-center'>
                                        <Card.Title>{villa && villa.villaName}</Card.Title>
                                        <Card.Text>{villa && villa.bio}</Card.Text>
                                        <p>+62{villa && villa.contact}</p>
                                        <button className="btn btn-primary">{user&&user.role}</button>
                                        <Col lg={12} className='mt-2'>
                                            <Row>
                                                <Col lg={6}>
                                                    <p>Likes : {villa&&villa.likes.length}</p>
                                                </Col>
                                                <Col lg={6}>
                                                    <p>2</p>
                                                </Col>
                                            </Row>
                                            <Row className='mt-4'>
                                                <Col lg={12}>
                                                    <a href={villa&&villa.social.facebook} target='_blank' style={{fontSize:'20px',marginRight:'10px'}}>
                                                        <i className='mdi mdi-facebook'/>
                                                    </a>
                                                    <a href={villa&&villa.social.instagram} target='_blank' style={{fontSize:'20px',marginRight:'10px',marginLeft:'10px'}}>
                                                        <i className='mdi mdi-instagram'/>
                                                    </a>
                                                    <a href={villa&&villa.social.youtube} target='_blank' style={{fontSize:'20px',marginLeft:'10px'}}>
                                                        <i className='mdi mdi-youtube'/>
                                                    </a>


                                                </Col>
                                            </Row>
                                        </Col>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="jumbotron-group  mt-5">
                                <div className="likes">
                                    <h5>Likes</h5>
                                    <div style={{height:'380px',maxHeight:'380px',overflowY:'auto',borderRadius:'10px',border:'none'}}>
                                        <table className='table table-dark' style={{borderRadius:'10px',border:'none'}}>
                                            <thead>
                                            <tr className='text-left'>
                                                <th>No</th>
                                                <th>Image</th>
                                                <th>Username</th>
                                                <th>Date</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {likes&& likes.map((item)=>(
                                                <tr key={item._id}>
                                                    <td>{i++}</td>
                                                    <td><img src={'https:'+item.avatar} alt="" style={{width:'50px'}}/></td>
                                                    <td>{item.name}</td>
                                                    <td><Moment fromNow>{item.date}</Moment>
                                                    </td>
                                                </tr>

                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="jumbotron-group mt-5">

                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </Fragment>
    )
}
DashboardDisplayVillaItem.propTypes={
    getCurrentRooms: PropTypes.func.isRequired,
    getLikes: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    villa: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth,
    villa: state.villa,
    room: state.room
})
export default connect(mapStateToProps,{getCurrentRooms,getCurrentVilla,getLikes}) (DashboardDisplayVillaItem);