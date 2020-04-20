import React, {Fragment, useState} from "react";
import {withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addKamar } from "../../../actions/villa";
import {Form, Image} from "react-bootstrap";
import {TextArea} from "semantic-ui-react";
import FileUpload from "../../../utils/FileUpload";

const AddRoom = ({ addKamar, history }) => {
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
    //uploads file
    const [file, setFile]= useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [limitRoomValue, setLimitRoomValue] = useState({});
    const [roomTypeValue, setRoomTypeValue] = useState({});
    const [bedTypeValue, setBedTypeValue] = useState({});

    const [Images, setImages] =useState([]);


    const [formData, setFormData] = useState({
        roomName: "",
        description: "",
        image: "",
        limit: "",
        harga: "",
        tipeKamar: "",
        fasilitas:{kasur:"",ac:"",tv:""}
    });
    //More destructring
    const { roomName,description, image,limit,harga,tipeKamar,kasur,ac,tv} = formData;

    const onChange = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const onSubmit =e =>{

    }

    const onLimitRoomSelectChange = e=>{
        setLimitRoomValue(e.target.value)
    }
    const onRoomTypeSelectChange = e=>{
        setRoomTypeValue(e.target.value)
    }

    const onBedTypeSelectChange = e=>{
        setBedTypeValue(e.target.value)
    }

    const updateImages = (newImages)=>{
        setImages(newImages)
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Add Room</h1>
            <Form className="form" onSubmit={onSubmit} encType="multipart/form-data">
                {/*DropZone*/}
                <FileUpload refreshFunction={updateImages}/>
                <div className="col-lg-12">
                    <div className="form-row">
                        <div className="col-lg-6">
                            <div className="form-group row col-lg-12">
                                <small className="form-text">Room Name<span style={{color:'red'}}>*</span></small>
                                <input
                                    type="text"
                                    className='form-control'
                                    name="roomName"
                                    value={roomName}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>

                            <div className="form-group row col-lg-12">
                                <small className="form-text">Description<span style={{color:'red'}}>*</span></small>
                                <TextArea
                                    name="description"
                                    style={{borderRadius:'10px'}}
                                    className='form-control'
                                    value={description}
                                    onChange={e => onChange(e)}/>
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
                                <select className='form-control' onChange={onRoomTypeSelectChange}>
                                    {RoomsTypes.map(item =>(
                                        <option key={item.key} value={item.key}>{item.value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group row col-lg-12'>
                                <small className="form-text">Bed Type<span style={{color:'red'}}>*</span></small>
                                <select className='form-control' onChange={onBedTypeSelectChange}>
                                    {BedType.map(item =>(
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
                                    value={harga}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group row col-lg-12">
                                <div className="col-lg-4">
                                    <Form.Check
                                        type="switch"
                                        name='ac'
                                        value={ac}
                                        onChange={e =>onChange(e)}
                                        id="ac-switch"
                                        label="AC"
                                    />
                                </div>
                                <div className='col-lg-4'>

                                    <Form.Check
                                        className={'ml-2'}
                                        type="switch"
                                        id="tv-switch"
                                        name='tv'
                                        value={tv}
                                        onChange={e =>onChange(e)}
                                        label="TV"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Form>
        </Fragment>
    );
};

AddRoom.propTypes = {
    addKamar: PropTypes.func.isRequired
};

export default connect(
    null,
    { addKamar }
)(withRouter(AddRoom));
