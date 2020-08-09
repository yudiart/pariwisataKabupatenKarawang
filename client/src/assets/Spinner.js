import React, { Fragment } from "react";
import spinner from "./SpinnerInterwind.gif";

export default () => (
    <Fragment>
        <div className="spinner-loading">
            <img className='spinner-item'
                 src={spinner}
                // style={{ width: "50px", margin: "auto", display: "block",position: 'absolute', left: '50%',top: '48%'}}
                 alt='Loading...'
            />
        </div>
    </Fragment>
);
