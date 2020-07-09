import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Alerts from "../../../Alert/Alerts";
import Dropzone, {useDropzone} from "react-dropzone";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addRoom} from "../../../../actions/room";
import {setAlert} from "../../../../actions/alert";
import fileUpload from "../../../../assets/style/fileUpload";
import {AxiosInstance as axios} from "axios";
const FileUpload =(props)=>{
    const classes = fileUpload();



    const thumbs = props.getFiles.map((file,index) => (
        <div className={classes.thumb} key={index}>
            <div className={classes.thumbInner}>
                <img
                    alt={file.size}
                    src={file.preview}
                    className={classes.img}
                />
            </div>
        </div>
    ));

    return(
        <Grid item xs={12} md={12} lg={12}>
            <Grid container>
                {props.getFiles.length > 0 ?
                    <Grid item xs={12} md={3} lg={3}>
                        <aside className={classes.thumbsContainer}>
                            {thumbs}
                        </aside>
                    </Grid>
                :null}
                {props.getFiles.length > 0 ? null :
                    <Grid item xs={12} md={6} lg={6}>
                        <Alerts/>
                        <div {...props.getRoot} className={classes.drop}>
                            <input {...props.getInput}/>
                            <AddIcon/> Drag & Drop
                        </div>
                    </Grid>
                }
            </Grid>
        </Grid>
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