import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import Data from "../../assets/Data.json";
import NavigasiBar from "../../views/header/NavigasiBar";
let {product:{products}} = Data

const ProductSingle = ()=>{
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [search, setSearch] = useState({
        search:''
    })
    let {id} = useParams();
    const product = products.map( items => items)
    const ids = product.filter((item)=> {return item.id === parseInt(id)})
    console.log(ids)
    const images = ids.map(image=>image)
    const [img,setImg] = useState()
    const onChange = (e)=>{
        let slideTo = e.target.dataset.slideto
        setImg(slideTo)
    }

    const [jumlah, setJumlah] = useState(1);
    const onJumlah = (e)=>{

        setJumlah(e.target.value)
    }

    const onMinJumlah  = (e)=>{
        if(jumlah > 1){
            setJumlah(jumlah - 1)
        }
    }
    const onPlusJumlah = (e)=>{
        setJumlah(jumlah + 1)
    }

    const footerProductSingle = (
        ids.map((item,index)=>(
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
            ))
    )


    return(
        <section>
            <NavigasiBar setSearch={setSearch} search={search} products={products}/>
            <main>
                <div className="display-product">
                    <div className="display-image-product">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            {ids.map((items,index)=> (
                                <ol className="carousel-indicators" key={index}>
                                    {items.images.map((image,idx)=>{
                                    return(
                                        <li key={idx}>
                                            <img
                                                className='active'
                                                onClick={onChange}
                                                data-id={idx}
                                                data-slideto={idx}
                                                src={image}
                                                alt={image}
                                            />
                                        </li>
                                    )})}
                                </ol>
                            ))}
                            <div className="carousel-inner">
                                {images.map((image,index)=>(
                                    <div className="carousel-item active" key={index}>
                                        <img  src={image.images[img]||image.images[0]} alt={index}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {ids.map((item,index)=>(
                        <div className="display-preview-product" key={index}>
                            <div className="product-category">
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

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            {footerProductSingle}
        </section>
    )
}

export default ProductSingle