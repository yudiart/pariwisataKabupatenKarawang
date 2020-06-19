import React from 'react';
import useStyle from "./../../assets/style/useStyle";
import Navbar from "./templates/navbar/Navbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
let data = "Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and ";
const Home =()=>{
    const classes = useStyle();
    return (
        <div className={classes.grow}>
            <Navbar/>
            <Grid container spacing={3} style={{marginTop:'200px'}}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Title</h1>
                        {[...new Array(12)]
                            .map(
                                () => data
                            )
                            .join("\n")}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}


export default Home;