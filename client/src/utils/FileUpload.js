import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import fs from 'fs-react';
import Axios from "axios";
import PropTypes from "prop-types";

const FileUpload = (props)=>{
    const[Images, setImages]=useState([]);
    const [displayImage, toggleImage] = useState(0);
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        //Save the image
         Axios.post('/api/room/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                } else {
                    alert('Failed to save the image in server')
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
            <div style={{display:"flex", justifyContent:"space-between"}} className={'row mb-2'}>
                <div style={{display:'flex',width:'300px',height:'260px',overflowX:'auto',overflowY:"hidden",borderRadius:'5px',background:'#FAFAFA',paddingTop:'10px'}}>
                    {Images.map((image,index)=>(
                        <div onClick={onDelete}>
                            <img
                                style={{minWidth:"300px",width:"300px",height:"240px",borderRadius:'10px'}}
                                src={`http://localhost:5005/${image}`}
                                alt={`Kamar-${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
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
export default FileUpload;