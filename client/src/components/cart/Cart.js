import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
const Cart = (props)=>{
    let {carts} = props
    //filter cart menyesuaikan id user
    let cartFilter = carts.filter((item)=>(item.users === 1))
    const itemProduct =(
        cartFilter.map((product)=>(
            product.product.map((item,index)=>{
                let discount = (item.harga - (item.harga * item.discount / 100))
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                return(
                <div className="cart-item" key={index}>
                    <div className="cart-toko">
                        <label className="checkbox">
                            <input type="checkbox" className="check" />
                            <span className="checkmark"/>
                        </label>
                        <div className="toko-detail">
                            <div className="detail">
                                <h4>{item.toko.toko_name}</h4>
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
                                <img src={item.images[0]} alt=""/>
                            </div>
                            <div className="detail-item">
                                <div className="detail-item-name">
                                    <h4>{item.product_name}</h4>
                                </div>
                                <div className="detail-item-harga">
                                    <h4>Rp. {discount}</h4>
                                </div>
                                <div className="detail-item-discount">
                                    <h4>{item.discount}%</h4>
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
                                    <NotificationsIcon/>
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
                </div>
            )})
        ))
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
                        {itemProduct}
                    </div>
                </div>
                <div className="proccess-product">

                </div>
            </div>
            <div className="all-products">
                <p>Footer</p>
            </div>
        </div>
    )
}


export default Cart