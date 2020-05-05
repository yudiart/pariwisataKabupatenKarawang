import React from 'react';

const SideNav = props =>{
    let classes = 'sidenav-nav';
    if (props.show){
        classes = 'sidenav-nav open';
    }
    return(
        <div className="sidenav-nav" role='presentation'>
            <div className="navitem">
                <div className="navicon">
                    <i className='mdi mdi-home'/>
                </div>
                <div className="navtext">Dashboard</div>
            </div>
            <div className="navitem">
                <div className="navicon">
                    <i className='mdi mdi-home'/>
                </div>
                <div className="navtext">Rooms</div>
            </div>
            <div className="navitem">
                <div className="navicon">
                    <i className='mdi mdi-settings'/>
                </div>
                <div className="navtext">Settings</div>
            </div>
            <div className="navitem">
                <div className="navicon">
                    <i className='mdi mdi-chart-areaspline'/>
                </div>
                <div className="navtext">Statistic</div>
            </div>
            <div className="navitem" onClick>
                <div className="navicon">
                    <i className='mdi mdi-file-chart'/>
                </div>
                <div className="navtext">Reports</div>
            </div>
            <div className="navitem">
                <div className="navicon">
                    <i className='mdi mdi-logout'/>
                </div>
                <div className="navtext">Logout</div>
            </div>
        </div>
    )
}

export default SideNav;