import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PersonIcon from '@material-ui/icons/Person';
import Slide from "@material-ui/core/Slide";
import UpdateIcon from '@material-ui/icons/Update';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme)=>({
    card:{
        maxWidth: "100%",
        top: '50%',
        left: '50%',
        borderRadius:10,
        transform: 'translate(-50%, - 50%)',
        backgroundSize: '200%',
        // boxShadow: ' 0 3px 5px 2px rgba(255, 105, 135, .3)',
        transition: '0.5s',
        backgroundImage: 'linear-gradient(45deg, #ffb74d, #ff9800, #f73378)',
        '&:hover':{
            backgroundPosition:'right'
        }
    },
    cardText:{
        color:"white"
    },
    buttonText:{
        backgroundColor: '#ffb74d',
        color:"white",
        fontWeight:'bold'
    },
    form:{
        padding:20,
        paddingRight:40,
        width: '100%', // Fix IE 11 issue.
        marginRight:15
    },
    container: {
        display: 'flex',
        backgroundColor:'white',
        borderRadius:10
    },
    paper: {
        margin: theme.spacing(1),
    }
}));
const Settings = ()=>{
    const classes = useStyles();

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    const CardInfo = ()=>(
        <CardContent className={classes.cardText}>
            <Typography gutterBottom variant="h6" component="h3" className={classes.cardText}>
                <PersonIcon/>Profile
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p" className={classes.cardText}>
                admin@gmail.com
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p" className={classes.cardText}>
                Jan, 7 2020
            </Typography>
        </CardContent>
    )

    const FormEdit = ()=>(
        <Grid item xs={12} md={12} lg={12}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={6}>
                    <div className={classes.container}>
                        <Slide direction="up" in={!open} mountOnEnter unmountOnExit>
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <TextField
                                    autoComplete="new-fullname"
                                    label="FullName"
                                    style={{ margin: 8 }}
                                    placeholder="Placeholder"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    autoComplete="new-email"
                                    label="Email"
                                    style={{ margin: 8 }}
                                    placeholder={'admin@gmail.com'}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    autoComplete="new-password"
                                    label="Password"
                                    type="password"
                                    style={{ margin: 8 }}
                                    placeholder="password"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    autoComplete="new-password2"
                                    label="Retype Password"
                                    type="password"
                                    style={{ margin: 8 }}
                                    placeholder="password"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <Button
                                    style={{marginLeft: 10,marginBottom:'20px',marginRight:'10px'}}
                                    variant="contained"
                                    type='submit'
                                    color="primary"
                                    onClick={handleClick}
                                    className={classes.button}
                                    startIcon={<UpdateIcon />}
                                >
                                    Update
                                </Button>
                                <Button
                                    style={{marginBottom:'20px',marginRight:'10px'}}
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e)=>handleChange(e)}
                                    className={classes.button}
                                    startIcon={<CloseIcon />}
                                >
                                    Close
                                </Button>
                            </form>
                        </Slide>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
    const [component, setComponent] =useState(<CardInfo/>)
    const [formUpdate, setFormUpdate] =useState(<FormEdit/>)
    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const handleChange = () => {
        setOpen((prev) => !prev);
    };
    const handleClick = () => {
        setOpenSnack(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    return(
        <Grid item xs={12} md={12} lg={12}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={4}>
                    <Card className={classes.card} elevation={0}>
                        {component}
                        <CardActions>
                            <Button
                                className={classes.buttonText}
                                size="small"
                                color="secondary"
                                onClick={(e)=>{handleChange(e)}}
                            >
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                {open ?
                    formUpdate
                    :null}
                <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Data updated!
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default Settings