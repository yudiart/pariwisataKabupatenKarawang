import React, {useEffect, useState} from 'react'
import {useParams,useHistory} from "react-router-dom";
import Data from "../../assets/Data.json";
import NavigasiBar from "../../views/header/NavigasiBar";
import ProductDetail from "../../components/layout/productsingle/ProductDetail";
import ProductFooter from "../../components/layout/productsingle/ProductFooter";
import ProductDisplayImage from "../../components/layout/productsingle/ProductDisplayImage";
let {product:{products}} = Data

const ProductSingle = ()=>{
    useEffect(() => () => {
        window.scroll({top:0,left:0})
        document.title = 'Mulai Jualan'
    }, [])

    const [search, setSearch] = useState({
        search:''
    })
    let {id} = useParams();
    const product = products.map( items => items)
    const ids = product.filter((item)=> {return item.id === parseInt(id)})
    const images = ids.map(image=>image)
    const [img,setImg] = useState()

    useEffect(() => {
        window.scrollTo(0, 0)
        document.previousTitle = document.title;
        document.title = ids.map((item)=> item.product_name)
    }, [])

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
          <ProductFooter item={item} index={index} jumlah={jumlah}/>
        ))
    )
    const displayImageProduct = (
        <ProductDisplayImage ids={ids} onChange={onChange} images={images} img={img}/>
    )
    const displayDetailProduct= (
        ids.map((item,index)=>(
            <ProductDetail
                index={index}
                item={item}
                jumlah={jumlah}
                onJumlah={onJumlah}
                onMinJumlah={onMinJumlah}
                onPlusJumlah={onPlusJumlah}
            />

        ))
    )
    return(
        <section>
            <NavigasiBar setSearch={setSearch} search={search} products={products}/>
            <main>

                <div className="display-product">
                    {displayImageProduct}
                    {displayDetailProduct}
                </div>
            </main>
            {footerProductSingle}
        </section>
    )
}

export default ProductSingle
