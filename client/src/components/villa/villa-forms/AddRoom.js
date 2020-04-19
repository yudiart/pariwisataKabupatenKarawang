import React, {Fragment, useState} from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addKamar } from "../../../actions/villa";
import {Form, Image} from "react-bootstrap";
import {TextArea} from "semantic-ui-react";

const AddRoom = ({ addKamar, history }) => {
    //uploads file
    const [file, setFile]= useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [formData, setFormData] = useState({
        roomName: "",
        description: "",
        image: "",
        limit: "",
        harga: "",
        tipeKamar: "",
        fasilitas:{kasur:"",ac:"",tv:""}
    });

    //Another piece of state...
    const [toDateDisabled, toggleDisabled] = useState(false);


    //More destructring
    const { roomName,description, image,limit,harga,tipeKamar,fasilitas:{kasur,ac,tv}} = formData;

    const onChange = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);
        try{
            const res = await axios.put('/upload',formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });

            const {fileName, filePath}=res.data;

            setUploadedFile({filename, filePath});
        }catch(err){
            if (500 === err.response.status){
                console.log('There was a problem with the server');
            }else{
                console.log(err.response.data.msg)
            }
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Add Room</h1>
            <Form
                className="form"
                enctype='multipart/form-data'
                onSubmit={onSubmit}
            >
                <div className="col-lg-8">
                    <h4>Room Picture</h4>
                    <div className='image col-lg-4 mb-2' style={{height:'150px',width:"150px",background:"gray"}}>
                        <Image src={`/upload/${filename}`} thumbnail />
                    </div>
                    <div className="form-group row col-lg-8">
                        <Form.File
                            id="custom-file-translate-scss"
                            label="Upload Room Image"
                            lang="en"
                            name="file"
                            value={image}
                            onChange={e => onChange(e)}
                            custom
                        />

                    </div>

                    <input type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light ml-2" to="/dashboard">
                        Go Back
                    </Link>
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
