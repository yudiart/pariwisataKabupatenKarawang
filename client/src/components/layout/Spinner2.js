import React, { Fragment } from "react";
import spinner from "./SpinnerDuaBall.gif";

export default () => (
    <Fragment>
        <img className='align-middle'
             src={spinner}
             style={{ width: "20px", margin: "auto", display: "block",position: 'absolute', left: '45.5%',top: '50%'}}
             alt='Loading...'
        />
    </Fragment>
);
