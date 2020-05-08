import React, {Fragment} from 'react';
import {useParams} from "react-router";
import VillaSettings from "./settings/VillaSettings";
import DisplayRooms from "./room/DisplayRooms";

import './displayVilla.css';
const DisplayVilla =()=>{
    let {pages} = useParams();
    return (
        <Fragment>
            <div className={'disp-villa'}>
                {pages === 'room'?
                    <DisplayRooms/>
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

export default DisplayVilla;
