import React, {Fragment} from 'react';
import {useParams} from "react-router";

const DisplayAdmin =()=>{
    let {pages} = useParams();
    return (
        <Fragment>
            {pages === 'pages1'?
                <div className="home">
                    <h1>pages 1</h1>
                </div>
                :null}
            {pages === 'pages2'?
                <div className="home">
                    <h1>pages 2</h1>
                </div>
                :null}
            {pages === 'pages3'?
                <div className="home">
                    <h1>pages 3</h1>
                </div>
                :null}
            {pages === 'pages4'?
                <div className="home">
                    <h1>pages 4</h1>
                </div>
                :null}
        </Fragment>
    )
}

export default DisplayAdmin;