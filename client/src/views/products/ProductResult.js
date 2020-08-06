import React, {Fragment, useEffect, useState} from 'react'
import NavigasiBar from "../../views/header/NavigasiBar";
import Data from "../../assets/Data.json";
import {useHistory} from "react-router-dom";
import MainProduct from "../../components/layout/productResult/MainProduct";
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
                                <MainProduct filtered={filtered} history={history}/>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

export default ProductResult