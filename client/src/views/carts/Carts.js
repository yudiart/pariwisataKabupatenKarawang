import React, {Fragment, useEffect, useState} from 'react'
import NavigasiBar from "../../views/header/NavigasiBar";
import Data from "../../assets/Data.json";
import Cart from "../../components/cart/Cart";
let {product:{products},carts} = Data
const Carts = ()=>{
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [search, setSearch] = useState({search:''})
    return(
        <Fragment>
            <NavigasiBar setSearch={setSearch} search={search} products={products}/>
            <main>
                <Cart carts={carts}/>
            </main>
            {/*<div className='footer'>*/}
            {/*    <p>footer</p>*/}
            {/*</div>*/}
        </Fragment>
    )
}

export default Carts