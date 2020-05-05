import React from 'react';

const ToggleButton = props =>{
    return(
        <div className='sidenav-button'>
            <button role='button' className='sidenav-toggle' onClick={props.click}>
                <span className='icon-toggle'/>
                <span className='icon-toggle'/>
                <span className='icon-toggle'/>
            </button>
        </div>
        )
}

export default ToggleButton;