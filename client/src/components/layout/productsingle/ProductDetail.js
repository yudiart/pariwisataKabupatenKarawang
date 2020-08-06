import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
const ProductDetail = (props)=>{
    let {
        index,
        item,
        onJumlah,
        onMinJumlah,
        onPlusJumlah,
        jumlah
    } = props

    let history = useHistory()
    const [description, setDescription] = useState(1)
    const [ulasan, setUlasan] = useState(0)
    let changed = typeof item.description === 'string' ?
        item.description.split('\n').map(text => <p>{text}<br/></p>) : item.description
        .reduce((nodes, node) => nodes.concat(node), []);

    //get date doang ini mah
    //Data nya ada di Data.json
    Date.prototype.yyyymmdd = function() {
        const data =['jan','feb','mar','apr','mei','jun','jul','aug','sep','okt','nov','des']
        let mm = this.getMonth() ; // getMonth() is zero-based
        let dd = this.getDate();
        return [
            (dd>9 ? '' : '0') + dd,
            (mm>9 ? '' : data[mm]) ,
            this.getFullYear()
        ].join(' ');
    };
    let date = new Date();

    return(
        <div className="display-preview-product" key={index}>
            <div className="product-header">
                <div className="product-category">
                    <div className="btn-back"  onClick={()=>{history.goBack()}}>
                        <i className="material-icons mdc-icon-button__icon" >keyboard_backspace</i>Back
                    </div>
                    <span><i className="material-icons mdc-icon-button__icon cart-header">store_mall_directory</i>{item.toko.toko_name}</span>
                </div>
                <div className="product-name">
                    <h1>{item.product_name}</h1>
                    <div className="detail">
                        <small>
                            Terjual {item.terjual} product
                        </small>
                    </div>
                    <div className="divider"/>
                </div>
            </div>
            <div className="product-details">
                <div className="product-info">
                    {item.discount > 0 ?
                        <div className="product-harga">
                            <h1>harga</h1>
                            <p>Rp.{(item.harga - (item.harga * item.discount / 100)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</p>
                            <span> / Rp.{item.harga}</span>
                        </div>
                        :
                        <div className="product-harga">
                            <h1>harga</h1>
                            <p>Rp.{(item.harga - (item.harga * item.discount / 100)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</p>
                        </div>
                    }
                    <div className="divider"/>
                    <div className="product-discount">
                        <h1>Discount</h1>
                        <p>{(item.discount)}%</p>
                    </div>
                    <div className="divider"/>
                    <div className="product-jumlah">
                        <h1>Jumlah</h1>
                        <div className="product-jumlah-input">
                            {jumlah < 1 ? null :
                                <button
                                    style={{background:jumlah === 1 ?'#dedede':''}}
                                    onClick={onMinJumlah}
                                >-</button>
                            }
                            <input
                                onChange={onJumlah}
                                type="number"
                                disable="disable"
                                value={jumlah <= (item.stock - item.terjual)? jumlah: item.stock - item.terjual}

                            />
                            {/*{jumlah <=!  item.stock - item.terjual? null :*/}
                            <button
                                disabled={`${jumlah === (item.stock - item.terjual) ?'disabled':''}`}
                                style={{background:jumlah === (item.stock - item.terjual) ?'#dedede':''}}
                                onClick={onPlusJumlah}
                            >+</button>
                            {/*}*/}
                        </div>
                    </div>
                    <div className="divider"/>
                    <div className="product-detail-info">
                        <h1>Info product</h1>
                        <div className="product-berat">
                            <h4>Berat</h4>
                            <span>{item.detail.berat}gr</span>
                        </div>
                        <div className="product-kondisi">
                            <h4>kondisi</h4>
                            <span>{item.detail.kondisi}</span>
                        </div>
                        <div className="product-asuransi">
                            <h4>Asuransi</h4>
                            <span>{item.detail.asuransi === 1 ?"Ya":"Tidak"}</span>
                        </div>
                    </div>
                    <div className="divider"/>
                    <div className="product-deskripsi">
                        <ul>
                            <li
                                className={`${description ? 'active':null}`}
                                onClick={()=>{
                                    setDescription(1)
                                    setUlasan(0)
                                }}
                            >Description
                            </li>
                            <li
                                className={`${ulasan ? 'active':null}`}
                                onClick={()=>{
                                    setUlasan(ulasan +1)
                                    setDescription(0)
                                }}
                            >Ulasan({item.ulasan.length})
                            </li>
                        </ul>
                       <div className="tab-deskripsi">
                           <div className={`product-description ${description ?'active':null}`}>
                               {changed}
                           </div>
                           <div className={`product-ulasan ${ulasan ?'active':null}`}>
                               {item.ulasan.map((ulasan,idx)=>(
                                   <div className="ulasan-item">
                                       <div className="user-image">
                                           <img src="https://s3.ap-northeast-2.amazonaws.com/vodonesia.id/Room/Spesifikasi-dan-Harga-Vespa-Primavera.jpg" alt=""/>
                                       </div>
                                       <div className="user-ulasan">
                                           <span>{date.yyyymmdd().toUpperCase()}</span>
                                           <small>{ulasan.text}</small>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail