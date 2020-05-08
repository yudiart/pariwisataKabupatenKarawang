import React from 'react';
import {useParams} from "react-router";

const VillaItems = ()=>{
    let {pages} = useParams();
    return(
        <div>
            {pages === 'home'?
                <div className="home">
                    <h1>home</h1>
                </div>
                :null}
            {pages === 'settings'?
                <div className="home">
                    <h1>Settings</h1>
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
    )
}