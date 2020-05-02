import React from 'react';
import {Link} from "react-router-dom";

const FooterRight = ()=>{
    return(
        <div className='footerItem mt-4'>
            <div className="footerItemLink">
                <div className='footerBrand'>
                    <h3>Join Villa</h3>
                </div>
                <div className='footerBrand partnership'>
                    <ul>
                        <li><Link to={'/villa/register'} className='nav-link'><i className='mdi mdi-bookmark'/>Register</Link></li>
                        <li><Link to={'/villa/login'} className='nav-link'><i className='mdi mdi-bookmark'/>Login</Link></li>
                        <li><Link to={'/'} className='nav-link'><i className='mdi mdi-bookmark'/>Ketentuan</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FooterRight;