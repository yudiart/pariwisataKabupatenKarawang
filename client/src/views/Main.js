import React from 'react'
import {useHistory} from 'react-router-dom';
import SliderPromo from "../components/slider/SliderPromo";
import KategoriPilihan from "../components/Kategori/KategoriPilihan";
import BannerPromotion from "../components/banner/BannerPromotion";

const Main = (props)=>{
    let history = useHistory()
    let {products,promo} = props
    let product = products.map((items)=>items).slice(0,10)

    const ItemProducts = (
        product.map((items,index)=>{
        let harga = items.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        let discount = (items.harga - (items.harga * items.discount / 100)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        return(
            <li className="cards_item" key={index}>
                <div className="card" onClick={(e)=>{
                    history.push(`${items.toko.toko_name.replace(/ /g, '-')}/${items.product_name.replace(/ /g, '-')}&trkid=${items.id}`)
                }}>
                    <div className="card_image">
                        <img src={items.images[0]} alt={items.images.url}/>
                    </div>
                    <div className="card_content">
                        <h2 className="card_title">{items.product_name}</h2>
                        <div className="card_text">

                            {items.discount >0?
                                <>
                                    <p className="card_harga">Rp.{discount}</p>
                                    <p className="card_discount">{items.discount}%</p>
                                </>
                                : <p className="card_harga">Rp.{harga}</p>}
                        </div>
                        <div className="toko">
                            <div className="toko__name" onClick={(e)=>{
                                console.log('clicked')}}>
                                <i className="material-icons mdc-icon-button__icon cart-header">store</i>
                                <span>{items.toko.toko_name}</span>
                            </div>
                        </div>
                        {/*<button className="btn card_btn">Read More</button>*/}
                    </div>
                </div>
            </li>
            )
        })
    )
    const kategoriList = [
        {kategori:"All Categori", icon:"clear_all"},
        {kategori:"Special Discount", icon:"confirmation_number"},
        {kategori:"Makanan", icon:"fastfood"},
        {kategori:"Kecantikan", icon:"opacity"},
        {kategori:"Fashion", icon:"insights"}
    ]
    return(
        <main>
            <div className="main">
                <SliderPromo promo={promo}/>
                <div className="main__content">
                    <div className="main__product">
                        <div className="section__product">
                            <KategoriPilihan/>
                            <div className="product-carousel-promo">
                                <div className="box-official">
                                    <div className="header-official">
                                        <h2>Official Store</h2>
                                    </div>
                                    <div className="card-official">
                                        <h2>Mulai Jualan</h2>
                                        <p style={{textAlign:'justify'}}>Anda dapat belajar lebih banyak & lengkap untuk memulai Bisnis Online,
                                            karena akan dipandu dari materi paling dasar hingga materi praktis
                                            sehingga memudahkan serta memberikan peluang nyata untuk menambah
                                            penghasilan dengan terus bekerja dari rumah. Waktu dengan keluarga cukup & penghasilan lebih dari cukup.</p>
                                    </div>
                                </div>

                                <BannerPromotion promo={promo}/>
                            </div>
                            <div className="products-recomended">
                                {kategoriList.map((item,index)=>(
                                    <div className={`product-card-${index + 1}`} key={index}>
                                        <i className="material-icons mdc-icon-button__icon cart-header">{item.icon}</i>
                                        <h4>{item.kategori}</h4>
                                    </div>
                                ))}
                            </div>
                            <div className="products-result">
                                <ul className="cards">
                                    {ItemProducts}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main