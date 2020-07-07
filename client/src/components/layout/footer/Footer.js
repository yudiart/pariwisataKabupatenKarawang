import React, {Fragment} from 'react';
import Typography from "@material-ui/core/Typography";
import useStyle from "../../../assets/style/useStyle";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
const Footer =()=>{
    const classes = useStyle();
    const datatext = "Lorem Ipsum hanyalah teks tiruan dari industri percetakan dan penyusunan huruf. Lorem Ipsum telah menjadi teks boneka standar industri sejak tahun 1500-an, ketika sebuah printer yang tidak dikenal mengambil jenis galley";
    return (
        <Fragment>
            <footer className={classes.footer}>
                <Container>
                    <Grid item xs={12} lg={12} md={12}>
                        <Grid container style={{padding:'10px'}}>
                            <Grid item xs={12} lg={4} md={6} style={{padding:'10px'}}>
                                <h1>Total User</h1>
                                <Typography style={{textAlign:'justify'}} color='secondary'>{datatext}</Typography>
                            </Grid>
                            <Grid item xs={12} lg={4} md={6} style={{padding:'10px'}}>
                                <h1>Materi</h1>
                                <Typography style={{textAlign:'justify'}} color='secondary'>{datatext}</Typography>
                            </Grid>
                            <Grid item xs={12} lg={4} md={6} style={{padding:'10px'}}>
                                <h1>Materi</h1>
                                <Typography style={{textAlign:'justify'}} color='secondary'>{datatext}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </footer>
        </Fragment>
    )
}
export default Footer;