import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import fs from 'fs-react';
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addRoom} from "../actions/room";

const FileUpload = (props,{room,history})=>{

    const[Images, setImages]=useState([]);
    const [displayImage, toggleImage] = useState(0);
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        formData.append("images", files[0])
        //Save the image
         Axios.post(`/api/room/`, formData, config)
            .then(response => {
                if (response.data.error) {
                    alert('Failed to save the image in server')
                } else {
                    alert('save image in server')
                    history.push('/dashboard');
                }
            })
    }
    return (
        <div className="col-lg-12">
            <div className='form-row'>
                <div className="row col-lg-6">
                    {Images.length === 0 ? (
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={8000000}
                        >
                            { ({getRootProps, getInputProps})=>(
                                <div className='row col-lg-12' >
                                    <div style={{width:'50px',
                                        height:'50px',
                                        border:'1px solid lightgray',
                                        display:'flex',
                                        cursor:'pointer',
                                        alignItems:'center',
                                        borderRadius:'10px',
                                        justifyContent:'center'
                                    }}{...getRootProps()}>
                                        <input {...getInputProps()}/>
                                        <i className="mdi mdi-plus " style={{fontSize:'3rem'}}/>
                                    </div>
                                    <div className={'mt-2 ml-2'}>
                                        <span><h3>Add Image</h3></span>
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                    ):null}

                    <small style={{color:'red'}}>*Click Picture to delete</small>
                </div>
            </div>
        </div>
    )
}
FileUpload.propTypes={
    addRoom: PropTypes.func.isRequired
}
const mapStateToProps = state=>({
    rooms: state.room
});
export default connect(mapStateToProps,{addRoom})(withRouter(FileUpload));