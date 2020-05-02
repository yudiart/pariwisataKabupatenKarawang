import React from 'react';
import './SideDrawer.css';
const SideDrawer = props=>{
    let drawerClasses = 'side-drawer'
    if (props.show) {
        drawerClasses = 'side-drawer open'
    }
    return(
        <div>
            <nav className={drawerClasses}>
                <ul>
                    <li><a href="">Dashboard 1</a></li>
                    <li><a href="">Dashboard 2</a></li>
                    <li><a href="">Dashboard 3</a></li>
                </ul>
            </nav>

        </div>
    )
}

export default SideDrawer;