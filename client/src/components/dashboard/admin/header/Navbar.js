import React from 'react';
import DrawerToggle from './sideDrawer/DrawerToggle';
import NavbarItem from './NavbarItem';


const Navbar = (props) =>{

    return (
        <div>
            <header className='toolbar'>
                <nav className='toolbar-navigation'>
                    <div className='toolbar-toggle-button'>
                        <DrawerToggle click={props.drawerClickHandler}/>
                    </div>
                    <div className='toolbar-logo'>
                        <a href="">Dashboard</a>
                    </div>
                    <div className="spacer"/>
                    <NavbarItem/>
                </nav>

            </header>
        </div>

    )
}
export default Navbar;