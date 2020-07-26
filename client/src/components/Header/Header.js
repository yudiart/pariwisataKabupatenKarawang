import React from 'react'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const Header = (props)=>{
    return (
        <Paper className={props.classes.backgroundHeader} elevation={0}>
            <Container>
                <Grid item xs={12} lg={12} md={12}>
                    <Grid container>
                        <Grid item xs={12} lg={3} md={3} style={{padding:'10px'}}>
                            <h1 className={props.classes.textColor}>Pariwisata Kab.Karawang</h1>
                            <p className={props.classes.textColor}>Untuk memenuhi tugas perkuliahan</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default Header