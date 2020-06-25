import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";


const Alerts = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div key={alert.id} style={{marginBottom:'20px',}}>
            <small><Alert  variant='filled' severity={alert.alertType}>{alert.msg}</Alert></small>
        </div>

    ));

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);
