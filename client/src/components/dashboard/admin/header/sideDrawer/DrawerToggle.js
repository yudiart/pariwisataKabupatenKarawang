import React from 'react';
import './DrawerToggleButton.css';

const DrawerToggle = props =>{
    return (
        <div>
            <button className='toggle-button'  onClick={props.click}>
                <div className="toggle-button-line"/>
                <div className="toggle-button-line"/>
                <div className="toggle-button-line"/>
            </button>
        </div>
    )
}

export default DrawerToggle;