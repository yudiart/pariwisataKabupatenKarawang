import React, {Fragment, useEffect, useState} from 'react'
import NavigasiBar from "../../views/header/NavigasiBar";
import Data from "../../assets/Data.json";
import {useHistory} from "react-router-dom";
let {product:{products}} = Data
const ProductResult = ({match})=>{
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let history = useHistory()
    const [search, setSearch] = useState({search:''})
    const {params} = match
    let qsearch = params.search.replace(/-/g, ' ').toLowerCase().split(" ")
    let filtered = products.filter((product)=> {
        let cats = product.product_name.toLowerCase().split(' ');
        return cats.filter((cat)=> {
            return qsearch.indexOf(cat) !== -1;
        }).length === qsearch.length;
    });
    
    const ItemProducts = (
        filtered.length > 0 ?filtered.map((items,index)=>{
            let harga = items.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
            let discount = (items.harga - (items.harga * items.discount / 100)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
            return(
                <li className="cards_item" key={index}>
                    <div className="card" onClick={(e)=>{
                        history.push(`/${items.toko.toko_name.replace(/ /g, '-')}/${items.product_name.replace(/ /g, '-')}&trkid=${items.id}`)
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
        }):<h4>Produk tidak ada mas</h4>

    )
    return (
        <Fragment>
            <NavigasiBar setSearch={setSearch} search={search} products={products}/>
            <main>
                <div className="main__product-result">
                    <div className="main__sidebar">
                        <div className="sidebar">
                            <h1>Sidebar</h1>
                        </div>
                    </div>
                    <div className="main__products">

                        <div className="products">
                            <div className="products-result">
                                <ul className="cards">
                                    {ItemProducts}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

export default ProductResult