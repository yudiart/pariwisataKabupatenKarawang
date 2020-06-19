import React from 'react';
import clsx from 'clsx';
import {useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DashboardIcon from '@material-ui/icons/Dashboard';

import dashStyles from "../../../assets/style/dashStyles";


import {logout} from "../../../actions/auth";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const  Dashboard = ({auth,isAuthenticated})=>{
    const classes = dashStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const authLinks = (
        <section>
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button >
                    <ListItemIcon ><DashboardIcon color='secondary'/></ListItemIcon>
                    <ListItemText primary='Dashboard' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText primary='inbox' />
                </ListItem>

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
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color="secondary"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >


            </Drawer>
        </div>
    );
}
Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout})(Dashboard);
