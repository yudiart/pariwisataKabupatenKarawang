import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import dashStyle from "../../../../../assets/style/dashStyles";

const displayStyle = makeStyles((theme)=>({
    root: {
        minWidth: 275,
    },
    card:{
        // margin:10,
        maxWidth: "100%",
        top: '50%',
        left: '50%',
        borderRadius:10,
        transform: 'translate(-50%, - 50%)',
        backgroundSize: '200%',
        border:0,
        // boxShadow: ' 0 3px 5px 2px rgba(255, 105, 135, .3)',
        transition: '0.5s',
        color:"white",
        backgroundImage: 'linear-gradient(45deg, #ffb74d, #ff9800, #f73378)',
        '&:hover':{
            backgroundPosition:'right'
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        color: "#ffffff"
    },
    pos: {
        marginBottom: 12,
    },
    paper:{
        background:"white",
        padding:"20px",
        borderRadius:"10px",
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    papperLeft:{
        minHeight:400
    },
    cardProfile:{
        maxWidth:"100%",
        minHeight:400

    },
    media: {
        height: 140,
    },
    cardAction:{
        marginBottom:70
    },
    roots:{
        width:'100%'
    }
}))



const DashboardDisplayVilla =()=>{
    const classes = dashStyle();
    const classStyle = displayStyle()
    return(
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2} >
                    <Grid item xs={6} lg={4} md={4}>
                        <Card className={classStyle.card} variant="outlined">
                            <CardContent>
                                <Typography className={classStyle.title} color="textSecondary" gutterBottom>
                                    Total Room
                                </Typography>
                                <Typography variant="h2" component="h2">
                                    10
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} lg={4} md={4}>
                        <Card className={classStyle.card} variant="outlined">
                            <CardContent>
                                <Typography className={classStyle.title} color="textSecondary" gutterBottom>
                                    Total income /Month
                                </Typography>
                                <Typography variant="h2" component="h2">
                                    Rp. 3.000.000
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={4} md={4}>
                        <Card className={classStyle.card} variant="outlined">
                            <CardContent>
                                <Typography className={classStyle.title} color="textSecondary" gutterBottom>
                                    Total income /years
                                </Typography>
                                <Typography variant="h2" component="h2">
                                    Rp.32.000.000
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DashboardDisplayVilla