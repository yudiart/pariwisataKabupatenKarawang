import React, {useEffect} from 'react'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {getCarts} from "../../actions/cart";
import {useHistory} from "react-router";

const Cart = ({isAuthenticated,getCarts,cart,room,villa})=>{
    let history = useHistory()
    // if(!isAuthenticated){
    //     history.push('/')
    // }
    useEffect(()=>{
        getCarts()
    },[getCarts])

    useEffect(()=>{
    },[isAuthenticated])
    const cartDisplay = (
        isAuthenticated && !cart.loading ? cart.carts.rooms.map((items,index)=>{
                const getUserRoom = !villa.loading ?villa.villas.filter((vila)=> vila.user === items.user):null
                const getVillaName = !villa.loading ?getUserRoom.map((item)=>item.villaName):null

                return(
                    <div className="cart-item" key={index}>
                        <div className="cart-toko">
                            <label className="checkbox">
                                <input type="checkbox" className="check" />
                                <span className="checkmark"/>
                            </label>
                            <div className="toko-detail">
                                <div className="detail">
                                    <h4>{getVillaName}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="product-item-detail">
                            <label className="checkbox">
                                <input type="checkbox" className="check" />
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
                                        <h4>Rp.{items.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-item-process">
                            <div className="item-notes">
                                <p>Catatan untuk penjual</p>
                            </div>
                            <div className="item-process">
                                <div className="product-jumlah-input">
                                    <i className="material-icons mdc-icon-button__icon" data-badge={10}>notifications</i>
                                    <button
                                        // onClick={onMinJumlah}
                                    >-</button>
                                    <input
                                        // onChange={onJumlah}
                                        type="number"
                                        // value={jumlah}

                                    />
                                    <button
                                        // onClick={onPlusJumlah}
                                    >+</button>
                                </div>
                            </div>
                        </div>

                        {/*<h1>{item.roomName}</h1>*/}
                        {/*<p>{item.tipeKamar}</p>*/}
                        {/*<p>{item.description}</p>*/}
                        {/*<p>{item.limit}</p>*/}
                        {/*<div>*/}
                        {/*    <small>{item.fasilitas.ac}</small>*/}
                        {/*    <small>{item.fasilitas.tv}</small>*/}
                        {/*    <small>{item.fasilitas.bedtype}</small>*/}
                        {/*    <small>{item.fasilitas.wifi}</small>*/}
                        {/*</div>*/}
                    </div>

        )}):null
    )
    return(
        <div className="main__cart">
            <div className="carts-products">
                <div className="products">
                    <div className="header-carts">
                        <label className="checkbox">
                            <input type="checkbox" className="check" />
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
                </div>
                <div className="proccess-product">

                </div>
            </div>
        </div>
    )
}

Cart.propTypes = {
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
    { setAlert,getCarts}
)(Cart);