import React from 'react';

const Sidebar = ()=>{
    return(
        <div className='sidebar-dashboard'>
            <div className='sidebar-navigation-items'>
                <ul>
                    <li><button className='btn text-left link-items'><i className='mdi mdi-account'/>{' '}Account</button></li>
                    <li><button className='btn text-left link-items'><i className='mdi mdi-account'/>{' '}Add Room</button></li>
                    <li><button className='btn text-left link-items'><i className='mdi mdi-home'/>{' '}Display Room</button></li>
                    <li><button className='btn text-left link-items'><i className='mdi mdi-settings'/>{' '}Settings</button></li>
                    <div className='dropdown-divider'/>
                    <li><button className='btn text-left link-items'><i className='mdi mdi-access-point'/>Logout</button></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;