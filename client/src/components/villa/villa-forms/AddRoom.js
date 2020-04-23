import React, {Fragment, useState} from "react";
import {withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRoom } from "../../../actions/room";
import {Form} from "react-bootstrap";
import {TextArea} from "semantic-ui-react";
import FileUpload from "../../../utils/FileUpload";


const AddRoom = ({ addRoom,history}) => {
    const RoomsTypes = [
        {key:1, value:"Standar"},
        {key:2, value:"Deluxe"},
        {key:3, value:"Super Deluxe"},
        {key:4, value:"Presidential"},
        {key:5, value:"Other"},
    ];
    const LimitRoom = [
        {key:1, value:1},
        {key:2, value:2},
        {key:3, value:3},
        {key:4, value:4},
        {key:5, value:5},
        {key:6, value:6},
        {key:7, value:7},
        {key:8, value:8}
    ];
    const BedType = [
        {key:1, value:"Twin Bed"},
        {key:2, value:"Double Bed"},
        {key:3, value:"Other"}
    ];

    const [limitValue, setLimitValue] = useState('');
    const [roomTypeValue, setRoomTypeValue] = useState('');
    const [roomNameValue, setroomNameValue] = useState('');
    const [descriptionValue, setdescriptionValue] = useState('');
    const [hargaValue, sethargaValue] = useState('');
    const [Images, setImages] =useState([]);
    const onLimitRoomSelectChange = e=>{setLimitValue(e.target.value)}
    const onRoomTypeSelectChange = e=>{setRoomTypeValue(e.target.value)}
    const onRoomNameSelectChange = e=>{setroomNameValue(e.target.value)}
    const onDescriptionSelectChange = e=>{setdescriptionValue(e.target.value)}
    const onHargaSelectChange = e=>{sethargaValue(e.target.value)}
    const updateImages = (newImages)=>{setImages(newImages)}


    const onSubmit =e =>{
        e.preventDefault();

        const formData ={
            roomName: roomNameValue,
            description: descriptionValue,
            harga: hargaValue,
            images: Images,
            tipeKamar: roomTypeValue,
            limit: limitValue
        }
        addRoom(formData,history);
    }
    return (
        <Fragment>
            <Form className="form" onSubmit={onSubmit} encType="multipart/form-data">
                {/*DropZone*/}
                <FileUpload refreshFunction={updateImages}/>
                <div className="col-lg-12">
                    <div className="form-row">
                        <div className="form-group row col-lg-12">
                            <small className="form-text">Room Name<span style={{color:'red'}}>*</span></small>
                            <input
                                type="text"
                                className='form-control'
                                name="roomName"
                                value={roomNameValue}
                                onChange={onRoomNameSelectChange}
                                required
                            />
                        </div>
                        <div className="form-group row col-lg-12">
                            <small className="form-text">Description<span style={{color:'red'}}>*</span></small>
                            <TextArea
                                name="description"
                                style={{borderRadius:'10px'}}
                                className='form-control'
                                value={descriptionValue}
                                onChange={onDescriptionSelectChange}/>
                        </div>
                        <div className="form-group row col-lg-12">
                            <small className="form-text">Limit Room<span style={{color:'red'}}>*</span></small>
                            <select onChange={onLimitRoomSelectChange} className='form-control'>
                                {LimitRoom.map(item => (
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group row col-lg-12">
                            <small className="form-text">Room Type<span style={{color:'red'}}>*</span></small>
                            <select className='form-control' name='tipeKamar' onChange={onRoomTypeSelectChange}>
                                {RoomsTypes.map(item =>(
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group row col-lg-12">
                            <small className="form-text">Harga<span style={{color:'red'}}>*</span></small>
                            <input
                                type="number"
                                className='form-control'
                                name="harga"
                                value={hargaValue}
                                onChange={onHargaSelectChange}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <input type='submit' className='btn btn-primary' onSubmit={onSubmit}/>
                        </div>
                    </div>

                </div>
            </Form>
        </Fragment>
    );
};
AddRoom.propTypes = {
    addRoom: PropTypes.func.isRequired
};

export default connect(
    null,
    { addRoom }
)(withRouter(AddRoom));