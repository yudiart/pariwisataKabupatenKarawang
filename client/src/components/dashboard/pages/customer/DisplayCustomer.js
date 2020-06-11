import React, {Fragment} from 'react';
import {useParams} from "react-router";
import DisplayRooms from "../villa/room/DisplayRooms";
import VillaSettings from "../villa/settings/VillaSettings";


const DisplayCustomer = ()=>{
    let {pages} = useParams();
    return (
        <Fragment>
            <div className={'disp-villa'}>
                {
                    pages === 'room'?
                    <h1>Room</h1>
                    :null}
                {pages === 'settings'?
                    <div className="home">
                        <VillaSettings/>
                    </div>
                    :null}
                {pages === 'statistic'?
                    <div className="home">
                        <h1>Statistic</h1>
                    </div>
                    :null}
                {pages === 'report'?
                    <div className="home">
                        <h1>Report</h1>
                    </div>
                    :null}
            </div>
        </Fragment>
    )
}

export default DisplayCustomer;