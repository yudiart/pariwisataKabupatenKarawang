import React, {Fragment, useState} from "react";
import {withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addKamar } from "../../../actions/villa";
import {Form, Image} from "react-bootstrap";
import {TextArea} from "semantic-ui-react";
import FileUpload from "../../../utils/FileUpload";

const AddRoom = ({ addKamar, history }) => {
    //uploads file
    const [file, setFile]= useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

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
                                <select name="limit"  className='form-control' value={limit} onChange={e => onChange(e)}>
                                    <option value="0">* Select Limit Room</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            </div>
                            <div className="form-group row col-lg-12">
                                <small className="form-text">Room Type<span style={{color:'red'}}>*</span></small>
                                <select name="tipeKamar" className='form-control' value={tipeKamar} onChange={e => onChange(e)}>
                                    <option value="Standar">* Select Room Type</option>
                                    <option value="Standar">Standar</option>
                                    <option value="Deluxe">Deluxe</option>
                                    <option value="Super Deluxe">Super Deluxe</option>
                                    <option value="Presidential">Presidential</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className='form-group row col-lg-12'>
                                <small className="form-text">Bed Type<span style={{color:'red'}}>*</span></small>
                                <select name="kasur" className='form-control' value={kasur} onChange={e => onChange(e)}>
                                    <option value="Twin Bed">* Select Bed Type</option>
                                    <option value="Twin Bed">Twin Bed</option>
                                    <option value="Double Bed">Double Bed</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group row col-lg-12">
                                <small className="form-text">Harga<span style={{color:'red'}}>*</span></small>
                                <input
                                    type="text"
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
