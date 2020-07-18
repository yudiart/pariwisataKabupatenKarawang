import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FileUpload from "../../upload/FileUpload";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {makeStyles} from "@material-ui/core/styles";
import {setAlert} from "../../../../../actions/alert";
import axios from 'axios'
import {useDropzone} from "react-dropzone";
import Progress from "./percentage/Progress";
import LinearProgress from "@material-ui/core/LinearProgress";
import {addRoom} from "../../../../../actions/room";
import Alerts from "../../../../Alert/Alerts";
import Select from "@material-ui/core/Select";
import {useParams} from "react-router";

const useStyle = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(2),
    },
    background:{
        background: theme.palette.secondary.light,
        marginTop: theme.spacing(0),
        borderRadius:'0',
        minHeight:'100px'
    },
    textStyle:{
        color: "#fff",
        fontSize: 30,
        textAlign:"center",
        justifyContent:"center"
    },
    textField:{
        width:"100%",
        marginTop:10
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}))
const limitRoom =[
    {key:'0', value:'0'},
    {key:'1', value:'1'},
    {key:'2', value:'2'},
    {key:'3', value:'3'},
    {key:'4', value:'4'},
    {key:'5', value:'5'},
    {key:'6', value:'6'},
];
const RoomType = [
    {key:'0', value:'Room Type'},
    {key:'Standar', value:'Standar'},
    {key:'Deluxe', value:'Deluxe'},
    {key:'Super Deluxe', value:'Super Deluxe'},
    {key:'Presidential', value:'Presidential'},
    {key:'Other', value:'Other'}
];
const cekbok = [
    {key:'Tidak', value:'Tidak'},
    {key:'Ya', value:'Ya'}
];
const typeBed = [
    {key:'Single', value:'Single'},
    {key:'Double', value:'Double'}
];

const RoomForms = ({setAlert,addRoom,history,profile:{profile}})=>{
    const [files, setFiles] = useState([]);
    const [uploadFile,setUploadFile] = useState({});
    const fileMaxSize = 10000000 //bytes
    const acceptedFileType = 'image/x-png, image/png, image/jpg, image/jpeg'
    const [uploadPercentage, setUploadPercentage] =useState(0);
    const {getRootProps, getInputProps} = useDropzone({
        accept: acceptedFileType,
        maxSize:fileMaxSize,
        onDrop: async acceptedFiles => {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader()
                reader.onabort = () => console.log('file reading was aborted')
                reader.onload = async(e) => {
                    e.preventDefault()
                    const binaryStr = reader.result
                    const formData = new FormData()
                    formData.append('image',file)
                    try{
                        const ress = await axios.post('/api/v1/rooms/upload', formData, {headers:{'Content-Type':'multipart/form-data'},
                            onUploadProgress: progressEvent =>{
                                setUploadPercentage(
                                    parseInt(
                                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                    )
                                );
                                //Clear percen
                                setTimeout(()=>setUploadPercentage(0),3000)
                            }})
                        const {_id,images} = ress.data
                        console.log(images)
                        setUploadFile({images,_id})

                    }catch(err){
                        if(err.response.status === 500){
                            console.log('There was a problem with server')
                        }else{
                            console.log(err.response.data.msg)
                        }
                    }
                }
                reader.readAsArrayBuffer(file)
            })
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    const [roomNameValue, setRoomNameValue] =useState('');
    const [descriptionValue, setDescriptionValue] =useState('');
    const [acValue, setAcValue] =useState('');
    const [tvValue, settvValue] =useState('');
    const [bedtypeValue, setbedtypeValue] =useState('');
    const [wifiValue, setwifiValue] =useState('');
    const [otherValue, setotherValue] =useState('');
    const [hargaValue, sethargaValue] =useState('');
    const [limitValue, setLimitValue] =useState('');
    const [tipeKamarValue, setTipeKamarValue] =useState('');
    const onAcChange = e =>{setAcValue(e.target.value)}
    const onTvChange = e =>{settvValue(e.target.value)}
    const onBedTypeChange = e =>{setbedtypeValue(e.target.value)}
    const onWifiChange = e =>{setwifiValue(e.target.value)}
    const onOtherChange = e =>{setotherValue(e.target.value)}
    const onRoomNameChange = e =>{setRoomNameValue(e.target.value)}
    const onHargaChange = e =>{sethargaValue(e.target.value)}
    const onDescriptionChange = e =>{setDescriptionValue(e.target.value)}
    const onLimitChange = e =>{setLimitValue(e.target.value)}
    const onTipeKamarChange = e =>{setTipeKamarValue(e.target.value)}
    const onSubmit =async (e)=>{
        e.preventDefault()
        const idR = uploadFile._id
        const formData ={
            roomName: roomNameValue,
            description: descriptionValue,
            harga: hargaValue,
            limit: limitValue,
            tipeKamar: tipeKamarValue,
            ac: acValue,
            tv: tvValue,
            bedtype: bedtypeValue,
            wifi: wifiValue,
            other: otherValue
        }

        addRoom({formData, idR, history});
    }
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    console.log(uploadFile.images)
    const handleUnClick =(e)=>{
        e.preventDefault()
        if (profile !== null){
            if (uploadFile.images.length > 0){
                if (window.performance){
                    if (profile.roomName === 'null' && performance.navigation.type === 1){
                        alert('diisi sampai tuntas bos')
                    }
                }
            }
        }
    }
    // if (profile !== null){
    //     if (uploadFile.images.length > 0){
    //         if (window.performance){
    //             if (profile.roomName === 'null' && performance.navigation.type === 1){
    //                 alert('diisi sampai tuntas bos')
    //             }
    //         }
    //     }
    // }
    const classes = useStyle()
    return(
        <section>
            <Alerts/>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={(e)=>onSubmit(e)} onChange={handleUnClick}>
                <FileUpload
                    getRoot={getRootProps()}
                    getInput={getInputProps()}
                    getFiles={files}
                />
                    <LinearProgress
                        variant="determinate"
                        style={{
                            height: 20,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        value={uploadPercentage}
                        size={40}
                        thickness={4}
                    />
                {files.length === 0 ?null:
                <Grid item xs={12} md={12} lg={12}>
                    <TextField
                        className={classes.textField}
                        id="standard-basic"
                        label='Room Name'
                        variant="outlined"
                        name='roomName'
                        value={roomNameValue}
                        onChange={onRoomNameChange}
                    />
                    <TextField
                        className={classes.textField}
                        id="standard-basic"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        rowsMax={5}
                        name="description"
                        value={descriptionValue}
                        onChange={onDescriptionChange}
                    />
                    <small className="form-text">Limit Room<span style={{color:'red'}}>*</span></small>
                    <select onChange={onLimitChange} name='limit' className='form-control' value={limitValue}>
                        {limitRoom.map(item=>(
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                    </select>
                    <small className="form-text">Room Type<span style={{color:'red'}}>*</span></small>
                    <select className='form-control' name='tipeKamar' onChange={onTipeKamarChange} value={tipeKamarValue}>
                        {RoomType.map(item=>(
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                    </select>
                    <TextField
                        className={classes.textField}
                        id="standard-basic"
                        label="Harga"
                        type="number"
                        variant="outlined"
                        name='harga'
                        value={hargaValue}

                        onChange={onHargaChange}
                    />
                    <Fragment>
                        <FormControl className={classes.textField}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">AC</InputLabel>
                                <Select
                                    native
                                    name='ac'
                                    onChange={onAcChange}
                                    value={acValue}
                                    label="AC"
                                    inputProps={{
                                        name: 'ac',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    {cekbok.map(item=>(
                                        <option key={item.key} value={item.key}>{item.value}</option>
                                    ))}
                                </Select>
                            </FormControl>

                        </FormControl>
                        <FormControl className={classes.textField}>
                            <small className="form-text">Tv<span style={{color:'red'}}>*</span></small>
                            <select className='form-control' name='tv' onChange={onTvChange} value={tvValue}>
                                {cekbok.map(item=>(
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))}
                            </select>
                        </FormControl>
                        <FormControl className={classes.textField}>
                            <small className="form-text">Wifi<span style={{color:'red'}}>*</span></small>
                            <select className='form-control' name='wifi' onChange={onWifiChange} value={wifiValue}>
                                {cekbok.map(item=>(
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))}
                            </select>
                        </FormControl>
                        <FormControl className={classes.textField}>
                            <small className="form-text">Type Bed<span style={{color:'red'}}>*</span></small>
                            <select className='form-control' name='bedtype' onChange={onBedTypeChange} value={bedtypeValue}>
                                {typeBed.map(item=>(
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))}
                            </select>
                        </FormControl>
                    </Fragment>
                    <Button
                        variant="contained"
                        color="secondary"
                        type='submit'
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="inherit"
                        size="small"
                        className={classes.button}
                        // onClick={() => toggleSocialInputs(!displaySocialInputs)}
                    >
                        Add Socials
                    </Button>
                </Grid>
                }
            </form>
        </section>
    )
}

RoomForms.propTypes = {
    auth: PropTypes.object.isRequired,
    addRoom: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    room: state.room,
    profile: state.profile,
    alerts:state.alert
});
export default connect(mapStateToProps,{setAlert,addRoom})(RoomForms);