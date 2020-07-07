import React, {Fragment, useState} from 'react';
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
const MainAdmin = ({getQuiz,setAlert})=>{
    const classes = dashStyles();
    const classess = useStyle();
    let {url} = useParams();
    const dashboardUrl =(
        window.location.pathname === '/dashboard'?
            <DashboardDisplayAdmin/>
            :null
    )
    const [file,setFile] = useState('');
    const [filename,setFilename] = useState('Choose File');
    const [uploadedFile,setUploadedFile]= useState({})
    const handleDrop = (e)=>{
        console.log(filename)
        setFilename(e.target.files[0].name)
        // setFilename(e.target.files[0].name);
    }

    const onSubmit = async e=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);

        // addRoom(formData,setUploadedFile)
    }

    const urls = (
        <div>
            <Grid container className={classes.root} spacing={2}>
                {url === 'TambahRoom'?
                    <Grid item xs={12} lg={6} md={6}>

                        {/*<Paper elevation={0}>*/}
                            <Grid container >
                                <Grid item xs={12} md={12} lg={12}>
                                    <form onSubmit={onSubmit}>
                                        <input type={'file'} onChange={onSubmit}/>
                                        <FileUpload drop={handleDrop} fileName={filename}/>
                                    </form>
                                </Grid>
                            </Grid>
                        {/*</Paper>*/}
                    </Grid>
                    :null}
                {/*{url === 'createSoal'? <CreateSoal/>:null}*/}
                {/*{url === 'nilaiUser'? <NilaiUser/>:null}*/}
                {/*{url === 'materi'? <Materi/>:null}*/}
            </Grid>
        </div>
    )
    return (
        <Fragment>
            {dashboardUrl}
            {urls}
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