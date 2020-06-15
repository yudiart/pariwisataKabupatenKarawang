import React, {Fragment, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRoom } from "../../actions/room";
import {TextArea} from "semantic-ui-react";
import ImageUpload from "./ImageUpload";
import Alert from "../layout/Alert";
import {Label} from "reactstrap";
import {Col, Row} from "react-bootstrap";

const RoomForm = ({
    addRoom,history,
    room:{room},
    alert
}) => {

    const limitRoom =[
        {key:'0', value:'0'},
        {key:'1', value:'1'},
        {key:'2', value:'2'},
        {key:'3', value:'3'},
        {key:'4', value:'4'},
        {key:'5', value:'5'},
        {key:'6', value:'6'},
    ];
    const RoomType = [
        {key:'0', value:'Room Type'},
        {key:'Standar', value:'Standar'},
        {key:'Deluxe', value:'Deluxe'},
        {key:'Super Deluxe', value:'Super Deluxe'},
        {key:'Presidential', value:'Presidential'},
        {key:'Other', value:'Other'}
    ];
    const cekbok = [
        {key:'Tidak', value:'Tidak'},
        {key:'Ya', value:'Ya'}
    ];
    const typeBed = [
        {key:'Single', value:'Single'},
        {key:'Double', value:'Double'}
    ];
    const [roomNameValue, setRoomNameValue] =useState('');
    const [descriptionValue, setDescriptionValue] =useState('');
    const [acValue, setAcValue] =useState('');
    const [tvValue, settvValue] =useState('');
    const [bedtypeValue, setbedtypeValue] =useState('');
    const [wifiValue, setwifiValue] =useState('');
    const [otherValue, setotherValue] =useState('');
    const [hargaValue, sethargaValue] =useState('');
    const [limitValue, setLimitValue] =useState('');
    const [tipeKamarValue, setTipeKamarValue] =useState('');
    const onAcChange = e =>{setAcValue(e.target.value)}
    const onTvChange = e =>{settvValue(e.target.value)}
    const onBedTypeChange = e =>{setbedtypeValue(e.target.value)}
    const onWifiChange = e =>{setwifiValue(e.target.value)}
    const onOtherChange = e =>{setotherValue(e.target.value)}
    const onRoomNameChange = e =>{setRoomNameValue(e.target.value)}
    const onHargaChange = e =>{sethargaValue(e.target.value)}
    const onDescriptionChange = e =>{setDescriptionValue(e.target.value)}
    const onLimitChange = e =>{setLimitValue(e.target.value)}
    const onTipeKamarChange = e =>{setTipeKamarValue(e.target.value)}

    const onSubmit = e => {
        e.preventDefault();

        const formData = {
            roomName: roomNameValue,
            description: descriptionValue,
            harga: hargaValue,
            limit: limitValue,
            tipeKamar: tipeKamarValue,
                ac: acValue,
                tv: tvValue,
                bedtype: bedtypeValue,
                wifi: wifiValue,
                other: otherValue
        }
        addRoom(formData,history);
    };
    //

    return (
        <Fragment>
            <form className="form" onSubmit={onSubmit}>
                {room && room.images.length === 0 ?
                <div>
                    <ImageUpload/>
                </div>
                :null}


                {room === null?
                    <div className="col-lg-12">
                        <div className="form-row">
                            <div className="col-lg-6">
                                <Alert />
                                <div className="form-group row col-lg-12">
                                    <small className="form-text">Room Name<span style={{color:'red'}}>*</span></small>
                                    <input
                                        type="text"
                                        className='form-control'
                                        name='roomName'
                                        value={roomNameValue}
                                        onChange={onRoomNameChange}
                                    />
                                </div>

                                <div className="form-group row col-lg-12">
                                    <small className="form-text">Description<span style={{color:'red'}}>*</span></small>
                                    <TextArea
                                        name="description"
                                        style={{borderRadius:'10px'}}
                                        className='form-control'
                                        value={descriptionValue}
                                        onChange={onDescriptionChange}/>
                                </div>
                                <div className="form-group row col-lg-12">
                                    <small className="form-text">Limit Room<span style={{color:'red'}}>*</span></small>
                                    <select onChange={onLimitChange} name='limit' className='form-control' value={limitValue}>
                                        {limitRoom.map(item=>(
                                            <option key={item.key} value={item.key}>{item.value}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group row col-lg-12">
                                    <small className="form-text">Room Type<span style={{color:'red'}}>*</span></small>
                                    <select className='form-control' name='tipeKamar' onChange={onTipeKamarChange} value={tipeKamarValue}>
                                        {RoomType.map(item=>(
                                            <option key={item.key} value={item.key}>{item.value}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group row col-lg-12">
                                    <small className="form-text">Harga<span style={{color:'red'}}>*</span></small>
                                    <input
                                        type="number"
                                        className='form-control'
                                        name='harga'
                                        value={hargaValue}
                                        onChange={onHargaChange}
                                    />
                                </div>
                                    <Col lg={12}>
                                        <Row>
                                            <Col lg={3}>
                                                <div className="form-group row col-lg-12">
                                                    <small className="form-text">AC<span style={{color:'red'}}>*</span></small>
                                                    <select className='form-control' name='ac' onChange={onAcChange} value={acValue}>
                                                        {cekbok.map(item=>(
                                                            <option key={item.key} value={item.key}>{item.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div className="form-group row col-lg-12">
                                                    <small className="form-text">Tv<span style={{color:'red'}}>*</span></small>
                                                    <select className='form-control' name='tv' onChange={onTvChange} value={tvValue}>
                                                        {cekbok.map(item=>(
                                                            <option key={item.key} value={item.key}>{item.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div className="form-group row col-lg-12">
                                                    <small className="form-text">Wifi<span style={{color:'red'}}>*</span></small>
                                                    <select className='form-control' name='wifi' onChange={onWifiChange} value={wifiValue}>
                                                        {cekbok.map(item=>(
                                                            <option key={item.key} value={item.key}>{item.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div className="form-group row col-lg-12">
                                                    <small className="form-text">Type Bed<span style={{color:'red'}}>*</span></small>
                                                    <select className='form-control' name='bedtype' onChange={onBedTypeChange} value={bedtypeValue}>
                                                        {typeBed.map(item=>(
                                                            <option key={item.key} value={item.key}>{item.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="form-group row col-lg-12">
                                            <small className="form-text">Other<span style={{color:'red'}}>*</span></small>
                                            <textarea name="other" onChange={onOtherChange} value={otherValue} className="col-lg-12"/>
                                        </div>
                                    </Col>
                                <div className="form-group row col-lg-12">
                                    <input type="submit" className='btn btn-primary'/>
                                    <Link to={'/dashboard'} className='btn btn-light ml-4'>Go Back</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    :null}

            </form>
        </Fragment>
    );
};
RoomForm.propTypes = {
    addRoom: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    room: state.room
});
export default connect(
    mapStateToProps,
    { addRoom }
)(withRouter(RoomForm));
