import React, {Fragment} from 'react';

const Progress =({percentage})=>{
    return (
        <Fragment>
            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{width: `${percentage}%`}}>{percentage}%
                </div>
            </div>
        </Fragment>

    )}

export default Progress;