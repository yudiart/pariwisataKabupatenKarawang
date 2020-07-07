import React from 'react';
import PropTypes from "prop-types";

import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MainAdmin from "./admin/MainAdmin";

const DashboardMain = ({auth:{user}})=>{

    const dashStyle = makeStyles((theme) => ({
        toolbar: {
            display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
                padding: theme.spacing(3),
        }
    }))
    const classes = dashStyle();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            {user && user.role === 'admin'? <MainAdmin/>:null}
            {user && user.role === 'villa'? <MainAdmin/>:null}
            {user && user.role === 'customer'? <h1>Admin</h1>:null}
        </main>
    )
}

DashboardMain.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{})(DashboardMain);