import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import dashStyles from "../../../assets/style/dashStyles";
import useStyle from "../../../assets/style/useStyle";
import './HomeDisplay.css';
import CardItems from "./card/Card";

const HomeDisplay = (props)=>{
    const classes = dashStyles();
    const classess = useStyle();
    let rooms = props.room
    const layout = (
        <Grid container className={classes.root} spacing={0}>
            <Grid item xs={12} lg={12} md={12} >
                <Grid container >
                    <Grid item xs={12} lg={3} md={3} className='box-left'>
                        <Paper className={classess.paper} elevation={0}>
                            <div className='boxLeft'>
                                <h1>box left</h1>
                            </div>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={9} md={9}>
                        <Paper className={classess.paper} elevation={0}>
                            <div className='boxRight'>
                                <CardItems
                                    rooms={rooms}
                                    // getRooms={props.room}
                                    // getVilla={props.villa}
                                    // getProfile={props.profile}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
    return(
        <Fragment>
            <div style={{minHeight:500}} className='layout'>
                {layout}
            </div>
        </Fragment>
    )
}

export default HomeDisplay