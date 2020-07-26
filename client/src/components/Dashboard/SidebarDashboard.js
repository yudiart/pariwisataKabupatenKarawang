import React from 'react';
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TimelineIcon from '@material-ui/icons/Timeline';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";
import dashStyles from "../../assets/style/dashStyles";
import {useParams} from "react-router";

const SidebarDashboard = ({auth:{user},logout})=>{

    const classes = dashStyles();
    let {url} = useParams();
    let pathUrlUser = ['Profile','test','Settings','editProfile'];
    let pathUrlVilla = ['TambahRoom','profile','Settings','editProfile'];
    let pathUrlAdmin = ['TambahRoom','materi','nilaiUser'];
    const activeColor = (
        window.location.pathname === '/dashboard' ? 'secondary':'inherit'
    )
    const customer =(
        <section>
            <List>
                <Link to={'/dashboard'}  className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><DashboardIcon color={activeColor}/></ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                </Link>

                <Link to={`/dashboard/soal`} className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><CreateIcon color={url === pathUrlUser[0] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='Soal' />
                    </ListItem>
                </Link>
                <Link to={'/dashboard/test'} className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><TimelineIcon color={url === pathUrlUser[1] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='Hasil' color={url === pathUrlUser[1] ? 'secondary':'inherit'}/>
                    </ListItem>
                </Link>

            </List>
            <Divider />
            <List>
                <ListItem button onClick={logout}>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary="logout" />
                </ListItem>
            </List>
        </section>
    )
    const villa =(
        <section>
            <List>
                <Link to={'/dashboard'}  className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><DashboardIcon color={activeColor}/></ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                </Link>
                <Link to={'/dashboard/profile'} className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><PersonIcon color={url === pathUrlVilla[1] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='VillaProfile' color={url === pathUrlVilla[1] ? 'secondary':'inherit'} />
                    </ListItem>
                </Link>
                <Divider />
                <Link to={`/dashboard/TambahRoom`} className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><CreateIcon color={url === pathUrlVilla[0] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='TambahRoom' color={url === pathUrlVilla[0] ? 'secondary':'inherit'}/>
                    </ListItem>
                </Link>

                <Link to={'/dashboard/editProfile'} className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><TimelineIcon color={url === pathUrlVilla[3] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='edit Profile'/>
                    </ListItem>
                </Link>

            </List>
            <Divider />
            <Link to={'/dashboard/Settings'} className={classes.navlink}>
                <ListItem button>
                    <ListItemIcon >
                        <SettingsIcon color={url === pathUrlVilla[2] ? 'secondary':'inherit'}/>
                    </ListItemIcon>
                    <ListItemText primary='Settings' />
                </ListItem>
            </Link>
            <List>
                <ListItem button onClick={logout}>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary="logout" />
                </ListItem>
            </List>
        </section>
    )
    const admin =(
        <section>
            <List>
                <Link to={'/dashboard'}  className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><DashboardIcon color={activeColor}/></ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to={'/dashboard/CreateWisata'}  className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><NoteAddIcon color={url === pathUrlAdmin[0] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='Tambah Wisata' />
                    </ListItem>
                </Link>
                <Link to={'/dashboard/materi'}  className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><LibraryBooksIcon color={url === pathUrlAdmin[1] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='Materi' />
                    </ListItem>
                </Link>
                <Link to={'/dashboard/nilaiUser'}  className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><BubbleChartIcon color={url === pathUrlAdmin[2] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='Nilai' />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to={'/dashboard/createSoal'}  className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><NoteAddIcon color={url === pathUrlAdmin[0] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='Create Soal' />
                    </ListItem>
                </Link>
                <Link to={'/dashboard/materi'}  className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><LibraryBooksIcon color={url === pathUrlAdmin[1] ? 'secondary':'inherit'}/></ListItemIcon>
                        <ListItemText primary='Materi' />
                    </ListItem>
                </Link>
                <Link to={'/dashboard'}  className={classes.navlink}>
                    <ListItem button>
                        <ListItemIcon ><DashboardIcon color={activeColor}/></ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={logout}>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary="logout" />
                </ListItem>
            </List>
        </section>
    )

    return (
        user.role === 'admin' ? admin : null,
        user.role === 'customer'? customer:villa
    )
}
SidebarDashboard.propTypes ={
    logout: PropTypes.func.isRequired
}
const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps, { logout})(SidebarDashboard);