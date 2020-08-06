import React from 'react'

const ProductFooter = (props)=>{
    let {jumlah,index,item} = props
    return(
        <div className="footer" key={index}>
            <div className="footer-product">
                <div className="thumb_toko">
                    <div className="image"/>
                </div>
                <div className="toko-details">
                    <h3>{item.toko.toko_name}</h3>
                    <span>{item.toko.alamat_toko}</span>
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-product-price" key={index}>
                    <div className="product-total">
                        <h1>Total</h1>
                        <h2>
                            {jumlah > 0 && item.discount > 0 ?
                                "Rp." + ((item.harga - (item.harga * item.discount / 100))*jumlah).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")

                                :jumlah >0 && jumlah <= (item.stock - item.terjual) ? (item.harga * jumlah).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "."):null}
                        </h2>
                    </div>
                </div>
                <div className="footer-product-btn">
                    <button
                        className="beli_btn"
                        onClick={()=>{
                            console.log('button Beli Clicked')}
                        }
                    >
                        Beli</button>
                    <button
                        className="keranjan_btn"
                        onClick={()=>{
                            console.log('button Keranjang Clicked')}
                        }
                    >
                        Keranjang</button>
                </div>
            </div>
        </div>
    )
}
export default ProductFooter