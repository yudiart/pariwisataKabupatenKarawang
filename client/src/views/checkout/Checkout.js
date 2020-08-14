import React, {Fragment, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import wave from "../../assets/images/animation/wave.png";
import BottomBar from "../../components/bottomBar/BottomBar";

const Checkout = ()=>{
    let history = useHistory()
    let {checkOut} = history.location.state
    console.log(checkOut)
    const [showDetail, setShowDetail] = useState(0)

    const handleShowDetail = ()=>{
        setShowDetail(!showDetail)
    }

    const harga = checkOut.map(item=>(item.harga * item.order))
    const totalHarga = harga.reduce((a, b)=>{return a + b}, 0)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return(
        <Fragment>
            <div className="main__Checkout">
                <div className="jumbotron">
                    <div className="jumbotron-head">
                        <h1>Check out</h1>
                    </div>
                    {[0,1,2,3,4,5].map((items)=>(
                        <div style={{backgroundImage: `url(${wave})`}} className={`wave wave${items + 1}`} key={items}/>
                    ))}
                </div>
                <div className="box-checkout">
                   <div className="checkout-detail">
                       <div className="left-checkout">
                           <div className="address-details">
                               <div className="address-detail">
                                   <div className="address-title">
                                       <h4>Alamat User</h4>
                                   </div>
                                   <div className="address-body">
                                       <span>Mochamad Yudi Sobari</span>
                                       <p>Jl.rhs saca kusuma Kp.lengo RT.001 RW.014 No.60</p>
                                       <p>Karawang Barat, Kab.Karawang, 41316</p>
                                   </div>
                               </div>
                           </div>
                           {checkOut.map((item,index)=>(
                               <div className="checkout-item" key={index}>
                                   <div className="left-checkout-item">
                                       <div className="checkout-item-image">
                                           <img src={item.images[0].url} alt=""/>
                                       </div>
                                       <div className="checkout-item-detail">
                                           <h3>{item.roomName}</h3>
                                           <h4>Rp.{(item.harga)
                                               .toString()
                                               .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</h4>
                                           <span>jumlah : {item.order}</span>
                                       </div>
                                   </div>
                               </div>
                           ))}
                       </div>
                       <div className="proccess-product-fixed" style={{background:showDetail?'#007bff':null}} onClick={()=>setShowDetail(!showDetail)}>
                            <i className="material-icons mdc-icon-button__icon">style</i>
                            <span>Total</span>
                        </div>
                       <div className="right-checkout">
                           <div className="proccess-product">
                               <div className="join-member-promo">
                                   <div className="promo-join" onClick={()=>{
                                       console.log('Join Member')}}>
                                       <i className="material-icons mdc-icon-button__icon">star</i><h4>Join member eksklusif</h4>

                                   </div>
                               </div>
                               <div className="ringkasan-product">
                                   <h4>Ringkasan Belanja</h4>
                                   <div className="ringkasan-detail">
                                       <small>Total Harga</small>
                                       <span>Rp. {Math.round(totalHarga ).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span>
                                   </div>
                               </div>
                               <div className="btn-product" onClick={()=>history.push('/checkout')}>
                                   <button>Bayar</button>
                               </div>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
            <div className="proccess-product-fixed" style={{background:showDetail?'#007bff':null}} onClick={()=>setShowDetail(!showDetail)}>
                <i className="material-icons mdc-icon-button__icon">style</i>
                <span>Pilih Metode Pembayaran</span>
            </div>
            <div className={`${showDetail?'showing':'product-show'}`} >
                <div className="display-product-show">
                    <div className="close-btn">
                        <i className="material-icons mdc-icon-button__icon" onClick={(e)=>handleShowDetail(e)}>close</i>
                    </div>
                    <div className="join-member-promo">
                        <div className="promo-join" onClick={()=>{
                            console.log('Join Member')}}>
                            <span>Join member eksklusif</span>
                        </div>
                    </div>
                    <div className="ringkasan-product">
                        <h4>Total Harga</h4>
                        <div className="ringkasan-detail">
                            <span>Rp. {Math.round(totalHarga).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span>
                        </div>
                    </div>
                    <div className="btn-product" onClick={()=>{history.push('/checkout')}}>
                        <button>Bayar</button>
                    </div>
                </div>
                <div className={`background-product-show`} onClick={()=>setShowDetail(!showDetail)}/>
            </div>
            <BottomBar/>
        </Fragment>
    )
}
export default Checkout