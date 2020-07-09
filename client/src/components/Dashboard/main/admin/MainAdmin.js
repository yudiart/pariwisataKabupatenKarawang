import React, {Fragment, useEffect, useMemo, useState} from 'react';
import dashStyles from "../../../../assets/style/dashStyles";
import Grid from "@material-ui/core/Grid";
import useStyle from "../../../../assets/style/useStyle";
import {useParams} from "react-router";
import {connect} from 'react-redux';
import DashboardDisplayAdmin from "./pages/DashboardDisplayAdmin";
import PropTypes from "prop-types";
import {getQuiz} from "../../../../actions/question";
import {setAlert} from "../../../../actions/alert";
import FileUpload from "../upload/FileUpload";
import {useDropzone} from "react-dropzone";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import RoomForms from "../villa/Rooms/RoomForms";

const MainAdmin = ({getQuiz,setAlert})=>{
    const classes = useStyle();

    let {url} = useParams();
    const dashboardUrl =(
        window.location.pathname === '/dashboard'?
            <DashboardDisplayAdmin/>
            :null
    )

    const urls = (
        <div>
            <Grid container className={classes.root} spacing={2}>

                {/*{url === 'createSoal'? <CreateSoal/>:null}*/}
                {/*{url === 'nilaiUser'? <NilaiUser/>:null}*/}
                {/*{url === 'materi'? <Materi/>:null}*/}
            </Grid>
        </div>
    )
    return (
        <Fragment>
            {dashboardUrl}
            {url === 'TambahRoom'?
                <Grid item xs={12} md={6} lg={6}>
                    <RoomForms/>
                </Grid>
                :null}
        </Fragment>
    )
}
MainAdmin.propTypes = {
    auth: PropTypes.object.isRequired,
    getQuiz: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    alerts:state.alert
});

export default connect(mapStateToProps,{getQuiz,setAlert})(MainAdmin);