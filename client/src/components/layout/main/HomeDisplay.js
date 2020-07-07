import React, {Fragment, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import dashStyles from "../../../assets/style/dashStyles";
import useStyle from "../../../assets/style/useStyle";
import Typography from "@material-ui/core/Typography";
import {getVillas} from "../../../actions/villa";
import './HomeDisplay.css';

import LoadingBar from "../../loading/LoadingBar";


import PropTypes from "prop-types";
import {connect} from "react-redux";

const HomeDisplay = ({getVillas,loading})=>{
useEffect(()=>{
    getVillas();
},[getVillas]);

    const datatext = "Lorem Ipsum hanyalah teks tiruan dari industri percetakan dan penyusunan huruf. Lorem Ipsum telah menjadi teks boneka standar industri sejak tahun 1500-an, ketika sebuah printer yang tidak dikenal mengambil jenis galley dan mengacaknya untuk membuat buku spesimen jenis. Ini telah bertahan tidak hanya lima abad, tetapi juga lompatan ke pengaturan huruf elektronik, tetap pada dasarnya tidak berubah. Itu dipopulerkan pada 1960-an dengan merilis lembar Letraset yang mengandung bagian Lorem Ipsum, dan baru-baru ini dengan perangkat lunak desktop publishing seperti Aldus PageMaker termasuk versi Lorem Ipsum.";

    const classes = dashStyles();
    const classess = useStyle();

    const layout = (
        <Grid container className={classes.root} spacing={0}>
            <Grid item xs={12} lg={12} md={12} style={{opacity: !loading ? '1':'0.2'}}>
                <Grid container >
                    <Grid item xs={12} lg={2} md={4}>

                        <Paper className={classess.paper}>
                            {!loading?<h1>Loading nya udah</h1>:<LoadingBar/>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={2} md={4}>
                        <Paper className={classess.paper} elevation={1}>
                            {!loading?<h1>Loading nya udah</h1>:<LoadingBar/>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={2} md={4}>
                        <Paper className={classess.paper} elevation={1}>
                            {!loading?<h1>Loading nya udah</h1>:<LoadingBar/>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={2} md={4}>
                        <Paper className={classess.paper} elevation={1}>
                            {!loading?<h1>Loading nya udah</h1>:<LoadingBar/>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={2} md={4}>
                        <Paper className={classess.paper} elevation={1}>
                            {!loading?<h1>Loading nya udah</h1>:<LoadingBar/>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={2} md={4}>
                        <Paper className={classess.paper} elevation={1}>
                            {!loading?<h1>Loading nya udah</h1>:<LoadingBar/>}
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12} lg={12} md={12}  style={{opacity: !loading ? '1':'0.2'}}>
                <Grid container >
                    <Grid item xs={12} lg={3} md={4}>
                        <Paper className={classess.paper} elevation={0}>
                            <div className='boxLeft'>
                                <h1>box left</h1>
                                {!loading?datatext
                                :<div>
                                    <LoadingBar/>
                                    <LoadingBar/>
                                    <LoadingBar/>

                                </div>}
                            </div>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={9} md={4} spacing={2}>
                        <Paper className={classess.paper} elevation={0}>
                            <div className='boxRight'>
                                <h1>box Right</h1>
                                <Typography style={{textAlign:'justify'}} color='secondary'>
                                    {!loading? datatext:
                                        <div>
                                            <LoadingBar/>
                                            <LoadingBar/>
                                            <LoadingBar/>

                                        </div>
                                }</Typography>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
    return(
        <Fragment>
            <div style={{minHeight:500}}>
                {layout}
            </div>
        </Fragment>
    )
}


HomeDisplay.propTypes = {
    getVillas: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    villa: state.villa,
    loading: state.villa.loading
});
export default connect(mapStateToProps,{getVillas})(HomeDisplay);