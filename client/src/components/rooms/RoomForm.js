import React, {Fragment, useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRoom } from "../../actions/room";
import {TextArea} from "semantic-ui-react";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import ImageUpload from "./ImageUpload";

const RoomForm = ({
    addRoom,history,
    room:{room}
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
        {key:'1', value:'Standar'},
        {key:'2', value:'Deluxe'},
        {key:'3', value:'Super Deluxe'},
        {key:'4', value:'Presidential'},
        {key:'5', value:'Other'}
    ]
    const [roomNameValue, setRoomNameValue] =useState('');
    const [descriptionValue, setDescriptionValue] =useState('');
    const [hargaValue, sethargaValue] =useState('');
    const [limitValue, setLimitValue] =useState('');
    const [tipeKamarValue, setTipeKamarValue] =useState('');
    const onRoomNameChange = e =>{setRoomNameValue(e.target.value)}
    const onHargaChange = e =>{sethargaValue(e.target.value)}
    const onDescriptionChange = e =>{setDescriptionValue(e.target.value)}
    const onLimitChange = e =>{setLimitValue(e.target.value)}
    const onTipeKamarChange = e =>{setTipeKamarValue(e.target.value)}

    const [Images, setImages] =useState('');
    const updateImages = (newImages)=>{
        setImages(newImages)
    }
    const onSubmit = e => {
        e.preventDefault();

        const formData = {
            roomName: roomNameValue,
            description: descriptionValue,
            harga: hargaValue,
            limit: limitValue,
            tipeKamar: tipeKamarValue,
            images: Images,
        }
        addRoom(formData,history);
    };
    //

    return (
        <Fragment>
            <h1 className="large text-primary">Add  Room</h1>
            <form className="form" onSubmit={onSubmit}>
                {room && room.images.length === 0 ?
                    <ImageUpload/>
                :null}

                {/*DropZone*/}
                <div className="col-lg-12">
                    <div className="form-row">
                        <div className="col-lg-6">
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
                            <div className="form-group row col-lg-12">
                                <input type="submit" className='btn btn-primary'/>
                                <Link to={'/dashboard'} className='btn btn-light ml-4'>Go Back</Link>
                            </div>
                        </div>
                    </div>

                </div>
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
