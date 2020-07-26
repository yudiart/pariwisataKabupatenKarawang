import React, {Fragment} from 'react'
import Grid from "@material-ui/core/Grid"
import useStyle from "../../../../assets/style/useStyle"
import {useParams} from "react-router"
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import {setAlert} from "../../../../actions/alert"
import RoomForms from "../villa/Rooms/RoomForms";
import DashboardDisplayVilla from "./pages/DashboardDisplayVilla";
import Settings from "./settings/Settings";

const MainVilla = ({setAlert})=>{
    const classes = useStyle();

    let {url} = useParams();
    const dashboardUrl =(
        window.location.pathname === '/dashboard'?
            <DashboardDisplayVilla/>
            :null
    )

    const urls = (
        <div>
            {url === 'Settings'? <Settings/>:null}
            {/*{url === 'nilaiUser'? <NilaiUser/>:null}*/}
            {/*{url === 'materi'? <Materi/>:null}*/}
            {url === 'TambahRoom'?<RoomForms/>:null}
        </div>
    )
    return (
        <Fragment>
            {dashboardUrl}
            {urls}
        </Fragment>
    )
}
MainVilla.propTypes = {
    auth: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    alerts:state.alert
});

export default connect(mapStateToProps,{setAlert})(MainVilla);