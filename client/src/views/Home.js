import React, {Fragment, useEffect, useState} from 'react'
import NavigasiBar from "../views/header/NavigasiBar";
import Footer from "../components/footer/Footer";
import Data from '../assets/Data.json'
import Main from "./Main";
import {BrowserView, MobileView,IOSView,AndroidView,isAndroid, isMobile,isChrome, isIOS} from "react-device-detect";

let {product:{products,promo}} = Data
const Home =()=>{
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [search,setSearch] = useState({
        search:''
    })

    return(
        <Fragment>
            <BrowserView>
                <NavigasiBar setSearch={setSearch} search={search} products={products}/>
                <Main products={products} promo={promo}/>
                <Footer/>
            </BrowserView>
            <IOSView>
                <h2>IOS Bro</h2>
            </IOSView>
        </Fragment>
    )
}

export default Home