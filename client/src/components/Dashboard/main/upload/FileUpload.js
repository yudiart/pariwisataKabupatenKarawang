import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Alerts from "../../../Alert/Alerts";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addRoom} from "../../../../actions/room";
import {setAlert} from "../../../../actions/alert";

const FileUpload =(props)=>{
    console.log(props)
    return(
        <Dropzone
            onDrop={props.drop}
            multiple={false}
            name='file'
            accept={'application/* , image/*'}
            maxSize={10}
        >
            { ({getRootProps, getInputProps})=>(
                <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={6}>
                        <div style={{
                            width:'100%',
                            minHeight:'250px',
                            border:'1px solid lightgray',
                            display:'flex',
                            cursor:'pointer',
                            alignItems:'center',
                            borderRadius:'10px',
                            justifyContent:'center'
                        }}
                             {...getRootProps()}
                        >
                            <input {...getInputProps()}/>
                            <AddIcon/> Drop Here
                        </div>
                        <Alerts/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                    </Grid>

                </Grid>
            )}
        </Dropzone>
    )
}
FileUpload.propTypes = {
    auth: PropTypes.object.isRequired,
    addRoom: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    room: state.room,
    alerts:state.alert
});
export default connect(mapStateToProps,{addRoom,setAlert})(FileUpload);