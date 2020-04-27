import React, {useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';
import Axios from "axios";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Redirect} from "request";
import {addImage, getRoom} from "../../actions/room";
import {Link} from "react-router-dom";

const ImageUpload = ({props,
    room:{room}
    ,history

})=>{
    useEffect(()=>{
        getRoom();
    },[getRoom])

    const[Images, setImages]=useState([]);
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        formData.append("image", files[0])
        //Save the image
        Axios.put(`/api/room/${room._id}`, formData, config)
            .then(response => {
                if (response.data.error) {
                    alert('Failed to save the image in server')
                } else {
                    alert('Success Uploaded!');
                }
            })


    }
    const onDelete =(image)=>{
        const currentIndex =Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex,1)
        setImages(newImages)
        props.refreshFunction(newImages)
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
ImageUpload.propTypes = {
    getRoom: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    room: state.room
})
export default connect(mapStateToProps,{getRoom})(ImageUpload);