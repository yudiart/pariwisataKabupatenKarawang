import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import dashStyles from "../../../assets/style/dashStyles";
import useStyle from "../../../assets/style/useStyle";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from '@material-ui/icons/PostAdd';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const HomeDisplay = ()=>{
    const datatext = "Lorem Ipsum hanyalah teks tiruan dari industri percetakan dan penyusunan huruf. Lorem Ipsum telah menjadi teks boneka standar industri sejak tahun 1500-an, ketika sebuah printer yang tidak dikenal mengambil jenis galley dan mengacaknya untuk membuat buku spesimen jenis. Ini telah bertahan tidak hanya lima abad, tetapi juga lompatan ke pengaturan huruf elektronik, tetap pada dasarnya tidak berubah. Itu dipopulerkan pada 1960-an dengan merilis lembar Letraset yang mengandung bagian Lorem Ipsum, dan baru-baru ini dengan perangkat lunak desktop publishing seperti Aldus PageMaker termasuk versi Lorem Ipsum.";
    const classes = dashStyles();
    const classess = useStyle();
    return(
        <Fragment>
            <Grid container className={classes.root} spacing={0}>
                <Grid item xs={12} lg={12} md={12}>
                    <Grid container >
                        <Grid item xs={12} lg={2} md={4}>
                            <Paper className={classess.paper}>
                                <h1>Total User</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={2} md={4}>
                            <Paper className={classess.paper} elevation={1}>
                                <h1>Total User</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={2} md={4}>
                            <Paper className={classess.paper} elevation={1}>
                                <h1>Total User</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={2} md={4}>
                            <Paper className={classess.paper} elevation={1}>
                                <h1>Total User</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={2} md={4}>
                            <Paper className={classess.paper} elevation={1}>
                                <h1>Total User</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={2} md={4}>
                            <Paper className={classess.paper} elevation={1}>
                                <h1>Total User</h1>
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <Grid container >
                        <Grid item xs={12} lg={3} md={4}>
                            <Paper className={classess.paper} elevation={1}>
                                <h1>Total User</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={9} md={4}>
                            <Paper className={classess.paper} elevation={1}>
                                <h1>Total User</h1>
                                <Typography style={{textAlign:'justify'}} color='secondary'>{datatext}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <Grid container >
                        <Grid item xs={12} lg={3} md={4}>
                            <Paper className={classess.paper} elevation={1}>
                                <h1>Total User</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={9} md={4}>
                            <Paper className={classess.paper} elevation={1}>
                                <h1>Total User</h1>
                                <Typography style={{textAlign:'justify'}} color='secondary'>{datatext}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default HomeDisplay;