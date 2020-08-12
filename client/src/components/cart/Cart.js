import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {getCarts} from "../../actions/cart";
import {useHistory} from "react-router";
import {updateCartRooms} from "../../actions/room";
import {check} from "express-validator";

const Cart = ({isAuthenticated,getCarts,updateCartRooms,cart,room,villa})=>{
    let history = useHistory()
    if(!isAuthenticated){
        history.push('/')
    }
    useEffect(()=>{
        getCarts()
        updateCartRooms()
    },[getCarts,updateCartRooms])
    const [Carts, setCarts] = useState([])
    const [showDetail, setShowDetail] = useState(0)

    useEffect(()=>{
        setCarts(cart)
    })

    const handleChange = (e) => {
        // e.preventDefault();
        let name = e.target.name,
            value = e.target.value,
            checkbox = e.target.checked,
            idx = e.target.dataset.idx
        let items = {...Carts}
        const status = items.carts.rooms.map(items=>items.status)
        if (name === 'btn-min') {
            if (items.carts["rooms"][idx]["order"] <=1){
                items.carts["rooms"][idx]["order"]= items.carts["rooms"][idx]["order"]
            }else{
                items.carts["rooms"][idx]["order"]= items.carts["rooms"][idx]["order"] - 1
            }
        }
        else if (name === 'btn-plus')items.carts["rooms"][idx]["order"]= items.carts["rooms"][idx]["order"] + 1
        else if (name === 'order') items.carts["rooms"][idx]["order"]=parseInt(value)
        else if (name === 'order') items.carts["rooms"][idx]["harga"]=items.carts["rooms"][idx]["harga"] *items.carts["rooms"][idx]["order"]
        else if (name === 'checkOne'){
            if (items.carts["rooms"][idx].status){
                items.carts["rooms"][idx].status = checkbox
            }else{
                items.carts["rooms"][idx].status = items.carts["rooms"][idx].status =checkbox
            }
        }
        else if (name === 'checkAll'){
            items.carts["rooms"].forEach((checked) => {
                checked.status = checkbox

            })
        }
        setCarts(items)
        console.log(items)
    }
    useEffect(()=>{
        setCarts(cart)
    })

    const onSubmit = (e)=>{
        e.preventDefault()
    }
    const cartDisplay = (
        isAuthenticated && Carts.loading === false && !cart.loading? Carts.carts.rooms.map((items,index)=>{
            const getUserRoom = !villa.loading ?villa.villas.filter((vila)=> vila.user === items.user):null
            const getVillaName = !villa.loading ?getUserRoom.map((item)=>item.villaName):null
            return(
                <div className="cart-item" key={index} data-idx={`${index}`}>
                    <div className="cart-toko">
                        <div className="toko-detail">
                            <div className="detail">
                                <h4>{getVillaName}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="product-item-detail">
                        <label className="checkbox">
                            <input type="checkbox"
                                   name={'checkOne'}
                                   className="check" data-idx={index}
                                   checked={Carts.carts.rooms[index].status}
                                   onChange={(e)=>handleChange(e)}/>
                            <span className="checkmark"/>
                        </label>
                        <div className="product-item">
                            <div className="image-item">
                                <img src={items.images[0].url} alt=""/>
                            </div>
                            <div className="detail-item">
                                <div className="detail-item-name">
                                    <h4>{items.roomName}</h4>
                                </div>
                                <div className="detail-item-harga">
                                    <p>{items.description}</p>
                                </div>
                                <div className="detail-item-harga">
                                    <h4>Rp.{
                                        (items.harga  * Carts.carts.rooms[index].order)
                                            .toString()
                                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                                    }</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-item-process">
                        <div className="item-notes">
                            <p>Catatan untuk penjual</p>
                        </div>
                        <div className="item-process">
                            <div className="product-jumlah-input" key={index} data-idx={`${index}`}>
                                <i className="material-icons mdc-icon-button__icon" data-badge={10}>notifications</i>
                                <button
                                    name={'btn-min'}
                                    className="btn-proccess"
                                    type="button"
                                    data-idx={`${index}`}
                                    onClick={(e)=>handleChange(e)}
                                >-</button>
                                <input
                                    name="order"
                                    className="input-proccess"
                                    data-idx={`${index}`}
                                    onChange={(e)=>handleChange(e)}
                                    type="number"
                                    value={Carts.carts.rooms[index].order}

                                />
                                <button
                                    name={'btn-plus'}
                                    className={"btn-proccess"}
                                    type="button"
                                    data-idx={`${index}`}
                                    onClick={(e)=>handleChange(e)}
                                >+</button>
                            </div>
                        </div>
                    </div>
                </div>
        )}):null
    )
    return(
        <div className="main__cart">
            <div className="carts-products">
                <form onSubmit={onSubmit} className="products">
                    <div className="header-carts">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="checkAll"
                                checked={Carts.loading === false?Carts.carts.rooms.every((a)=> a.status):null}
                                className="check"
                                onChange={(e)=>handleChange(e)}/>
                            <span className="checkmark"/>
                        </label>
                        <div className="header">
                            <h4>Pilih Semua</h4>
                        </div>
                        <div className="delete">
                            <h5>hapus</h5>
                        </div>
                    </div>
                    <div className="divider"/>
                    <div className="cart-items">
                        {!room.loading && !cart.loading?
                            cartDisplay
                            :null}
                    </div>
                </form>
                <div className="proccess-product-fixed" style={{background:showDetail?'#007bff':null}} onClick={()=>setShowDetail(!showDetail)}>
                    <i className="material-icons mdc-icon-button__icon">style</i>
                    <span>Total</span>
                </div>
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
                            {/*<span>Rp. {Math.round(total).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span>*/}
                        </div>
                    </div>
                    <div className="btn-product">
                        <button>Bayar</button>
                    </div>
                </div>

                <div className={`${showDetail?'showing':'product-show'}`} >
                    <div className="display-product-show">
                        <div className="close-btn">
                            <i className="material-icons mdc-icon-button__icon" onClick={()=>setShowDetail(!showDetail)}>close</i>
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
                                <span>Rp.
                                    {/*{Math.round(total).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}    */}
                                </span>
                            </div>
                        </div>
                        <div className="btn-product">
                            <button>Bayar</button>
                        </div>
                    </div>
                    <div className={`background-product-show`} onClick={()=>setShowDetail(!showDetail)}/>
                </div>
            </div>
        </div>
    )
}

Cart.propTypes = {
    updateCartRooms: PropTypes.func.isRequired,
    getCarts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    cart:state.cart,
    room: state.room,
    alert:state.alert,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { setAlert,getCarts, updateCartRooms}
)(Cart);