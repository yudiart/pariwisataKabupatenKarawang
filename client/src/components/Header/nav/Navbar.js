import React, {Fragment} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import AppBar from "@material-ui/core/AppBar";
import useStyle from "../../../assets/style/useStyle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../../actions/auth";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {useHistory} from "react-router";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

const Navbar =({auth,isAuthenticated,logout})=>{
    const history = useHistory()
    const classes = useStyle()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            fontSize="small"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon onClick={()=>{history.push('/dashboard')}}>
                    <DashboardIcon fontSize="small" />
                    <Typography variant="inherit" noWrap>
                        Dashboard
                    </Typography>
                </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                    <Typography variant="inherit" noWrap>
                        My Account
                    </Typography>
                </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                    <Typography variant="inherit" noWrap>
                        Settings
                    </Typography>
                </ListItemIcon>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon onClick={logout}>
                    <ExitToAppIcon fontSize="small" />
                    <Typography variant="inherit" noWrap>
                        Logout
                    </Typography>
                </ListItemIcon>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        isAuthenticated?
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon fontSize="small" />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon fontSize="small" />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleProfileMenuOpen}>
                <PersonIcon
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <PersonIcon />
                </PersonIcon>
                <p>Profile</p>
            </MenuItem>
        </Menu>
        :<Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                <MenuItem>
                    <ButtonGroup variant="text" color="inherit" aria-label="text primary button group">
                        <Button variant="text" color="inherit" onClick={()=>{history.push('/login')}}>Login</Button>
                    </ButtonGroup>
                </MenuItem>
                <MenuItem>
                    <ButtonGroup variant="text" color="inherit">
                        <Button onClick={()=>{history.push('/register')}}>Register</Button>
                    </ButtonGroup>
                </MenuItem>
            </Menu>
    );

    const authMenu= (
        <section>
            <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon fontSize="small"/>
                    </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon fontSize="small" />
                    </Badge>
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle fontSize="small"/>
                </IconButton>
            </div>
            <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </div>
        </section>
    )
    //Not Authentication User

    const notauthMenu =(
        <section>
            <div className={classes.sectionDesktop}>
                <ButtonGroup variant="text" color="inherit" aria-label="text primary button group">
                    <Button onClick={()=>{history.push('/login')}}>Login</Button>
                    <Button onClick={()=>{history.push('/register')}}>Register</Button>
                </ButtonGroup>
            </div>
            <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </div>
        </section>
    )

    return (
        <Fragment>
            <AppBar
                color="secondary"
                position="fixed"
            >
                <Container>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Pariwisata
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        {isAuthenticated?authMenu:notauthMenu}
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Fragment>
    )
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logout})(Navbar);