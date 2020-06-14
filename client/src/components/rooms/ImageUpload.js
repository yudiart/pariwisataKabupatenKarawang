import React, {Fragment, useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';
import Axios from "axios";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addImage, clearRoom, getRoom} from "../../actions/room";
import {withRouter} from "react-router";
import Progress from "./Progress";
import {Col} from "react-bootstrap";
import {Row} from "reactstrap";

const ImageUpload = ({room:{room},history,clearRoom})=>{
    useEffect(()=>{
        getRoom();
        clearRoom();
    },[getRoom])

    const[Images, setImages]=useState([]);
    const [uploadPercentage, setUploadPercentage] =useState(0);


    const onDrop = (files) =>{
        let formData = new FormData();
        formData.append("image", files[0]);

        //Save the image

        Axios.put(`/api/room/${room&&room._id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
            onUploadProgress: progressEvent =>{
                setUploadPercentage(
                    parseInt(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    )
                );
                //Clear percen
                setTimeout(()=>setUploadPercentage(0),3000)
            }
        })
            .then(res => {
                history.push('/dashboard/room');
            })
    }


    return (
        <Fragment>
            <Col lg={12}>
                <div className='form-row'>
                    <div className="col-lg-6">
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

                        <small style={{color:'red'}}>{room && room._id}</small>
                    </div>
                </div>
            </Col>
            <div className="mt-4 mb-2">
                <Col lg={6}>
                    <Progress percentage={uploadPercentage}/>
                </Col>
            </div>
        </Fragment>
    )
}
ImageUpload.propTypes = {
    getRoom: PropTypes.func.isRequired,
    clearRoom: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    room: state.room
})

export default withRouter(connect(mapStateToProps,{getRoom,clearRoom})(ImageUpload));