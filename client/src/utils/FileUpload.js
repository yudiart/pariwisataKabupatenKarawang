import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import {addKamar} from "../actions/villa";
import Axios from "axios";

function FileUpload  (props){
    const[Images, setImages]=useState([]);
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        //Save the image
         Axios.put('/api/villa/kamar', formData, config)
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
                <div style={{display:'flex',width:'1200px',height:'260px',overflowX:'auto',overflowY:"hidden",borderRadius:'5px',background:'#FAFAFA',paddingTop:'10px'}}>
                    {Images.map((image,index)=>(
                        <div onClick={onDelete}>
                            <img
                                style={{minWidth:"300px",width:"300px",height:"240px",borderRadius:'10px'}}
                                src={`http://localhost:3000/${image}`}
                                alt={`Kamar-${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='form-row'>

                <div className="row col-lg-6">
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
                                    <input  {...getInputProps()}/>
                                    <i className="mdi mdi-plus " style={{fontSize:'3rem'}}/>
                                </div>
                                <div style={{width:'300px',lineHeight:'50px',
                                    height:'50px'}} className={'mt-2 ml-2'}>
                                    <span><h3>Tambah Kamar</h3></span>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                    <small style={{color:'red'}}>*Click Picture to delete</small>
                </div>
            </div>
        </div>

    )
}

export default FileUpload;