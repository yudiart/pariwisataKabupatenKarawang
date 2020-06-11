import React, {Fragment} from 'react';
import {useParams} from "react-router";
import VillaSettings from "./settings/VillaSettings";
import DisplayRooms from "./room/DisplayRooms";

import './displayVilla.css';
const DisplayVilla =()=>{
    let {pages,action} = useParams();

    return (
        <Fragment>
            <div className={'disp-villa'}>
                {window.location.pathname === `/dashboard/${pages}`?
                    <>
                        {pages === 'room'?
                        <div className="room">
                            <DisplayRooms/>
                        </div>
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
                    </>
                :window.location.pathname === `/dashboard/${pages}/${action}`?
                       <>
                           {pages === 'room'?
                               <>
                                   {action === 'addroom'?
                                       <h1>Addroom</h1>
                                       :null}
                                   {action === 'edit'?
                                       <h1>Edit Room</h1>
                                       :null}
                                   {action === 'delete'?
                                       <h1>Delete Room</h1>
                                       :null}
                               </>
                           :null}


                        </>
                :null}


            </div>
        </Fragment>
    )
}

export default DisplayVilla;
