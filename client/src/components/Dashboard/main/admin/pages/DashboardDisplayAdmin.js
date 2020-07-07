import React, {Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import dashStyles from "../../../../../assets/style/dashStyles";
import useStyle from "../../../../../assets/style/useStyle";

const DashboardDisplayAdmin = ()=>{
    const classes = dashStyles();
    const classess = useStyle();

    return(
        <Fragment>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container >
                        <Grid item xs={12} lg={4} md={6}>
                            <Paper className={classess.paper} elevation={0}>
                                <h1>Total User</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={4} md={6}>
                            <Paper className={classess.paper} elevation={0}>
                                <h1>Materi</h1>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={4} md={6}>
                            <Paper className={classess.paper} elevation={0}>
                                <h1>Materi</h1>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={0}>
                        <Grid item >
                            <Paper className={classess.paper} elevation={0}>
                                <h1>Materi</h1>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12} lg={6} md={6}>
                        <Paper elevation={0}>
                            <Grid item >
                                <Paper className={classess.paper} elevation={0}>
                                    <h1>Materi</h1>
                                </Paper>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item  xs={12} lg={6} md={6}>
                        <Paper elevation={0} >
                            <Grid item >
                                <Paper className={classess.paper} elevation={0}>
                                    <h1>Materi</h1>
                                </Paper>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}
export default DashboardDisplayAdmin;