import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";

const fileUpload = makeStyles((theme) => ({
    drop:{
        width:250,
        minHeight:'250px',
        border:'1px solid lightgray',
        display:'flex',
        cursor:'pointer',
        alignItems:'center',
        borderRadius:'10px',
        justifyContent:'center'
    },
    thumbsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    thumb:{
        display: 'inline-flex',
        borderRadius: 20,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 250,
        height: 250,
        padding: 4,
        boxSizing: 'border-box'

    },
    thumbInner:{
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    },
    img:{
        borderRadius: 20,
        objectFit:'fill',
        width: 240,
        height: 240,

    }
}));

export default fileUpload;