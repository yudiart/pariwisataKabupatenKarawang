import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";

const useStyle = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    paper: {
        background:"transparent",
        padding:"10px",
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.20),
        minWidth:'70%',
        transition: '0.2s',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.50),
            transition: '0.5s'
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        marginLeft:"50px",
        width: '80%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        minWidth: '70%',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            minWidth: '70%',
            width: '100%',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    //Card Style
    root: {
        maxWidth: 345,
    },
    'direction-xs-row-reverse': {
        flexDirection: 'row-reverse',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    backgroundHeader:{
        background: theme.palette.secondary.light,
        marginTop: theme.spacing(0),
        borderRadius:'0',
        minHeight:'200px'
    },
    headerImage:{
        background:theme.palette.secondary.contrastText,
        padding:"10px",
        margin:'5px',
        height:"120px",
        width:'95%',
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },

    footer: {
        backgroundColor: grey[900],
        padding: theme.spacing(2),
    },
}));

export default useStyle;