import React from 'react';
import {Link} from "react-router-dom";

const FooterCenter = ()=>{
    return (
        <div className='footerItem mt-4'>
            <div className="footerItemLink">
                <div className='footerBrand'>
                    <h3>pari<span style={{color:'red'}}>wisata</span></h3>
                </div>
                <div className='footerBrand partnership'>
                    <ul>
                        <li><Link to={'/'} className='nav-link'><i className='mdi mdi-bookmark'/> Partner 1</Link></li>
                        <li><Link to={'/'} className='nav-link'><i className='mdi mdi-bookmark'/> Partner 2</Link></li>
                        <li><Link to={'/'} className='nav-link'><i className='mdi mdi-bookmark'/> Partner 3</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FooterCenter;