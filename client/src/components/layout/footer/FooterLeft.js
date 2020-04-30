import React from'react';

const FooterLeft = ()=>{
    return(
       <div className='footerItem mt-4'>
           <div className="footerItemLink">
               <div className='footerBrand'>
                   <h3>pari<span style={{color:'red'}}>wisata</span></h3>
               </div>
               <div className='footerBrand partnership'>
                   <ul>
                       <li><a href="" className='nav-link'><i className='mdi mdi-bookmark'/> Partner 1</a></li>
                       <li><a href="" className='nav-link'><i className='mdi mdi-bookmark'/> Partner 2</a></li>
                       <li><a href="" className='nav-link'><i className='mdi mdi-bookmark'/> Partner 3</a></li>
                   </ul>
               </div>
           </div>
       </div>
    )

}

export default FooterLeft;
