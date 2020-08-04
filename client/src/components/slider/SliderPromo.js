import React, {useState} from "react";
import Slider from "react-slick";
import {useHistory} from 'react-router-dom';
const SliderPromo =(props)=>{
    let history = useHistory()
    const [state] = useState({
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1385,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }
        ],
        autoplaySpeed: 3000,
        slidesToScroll: 1,
        padding:20
    })
    let {promo} = props

    return(
        <Slider {...state} className="Slider" >
            {promo.map((item,index)=>{
                let discount = (item.harga - (item.harga * item.discount / 100))
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")

                return(
                <div className="products" key={index} onClick={(e)=>{
                    history.push(`${item.toko.toko_name.replace(/ /g, '-')}/${item.product_name.replace(/ /g, '-')}&trkid=${item.id}`)
                }}>
                    <div className="product-item">
                        <div className="preview" style={{padding:20}}>
                            <h6>{item.category}</h6>
                            <h2>{item.product_name}</h2>
                            <div className="discount">
                                <h4>{item.discount}%</h4>
                            </div>
                            <h3>Rp.{discount}</h3>
                            <div className="progress-wrapper">
                                <div className="stock">
                                    <div className="stock-progress" style={{width:parseInt(item.terjual / item.stock * 100)}}/>
                                </div>
                                <span className="progress-text">{item.stock - item.terjual} tersisa</span>
                            </div>
                        </div>
                        <div className="info">
                            <div className="image-preview">
                                <img
                                    src={item.images[0]}
                                    alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            )})}
        </Slider>
    )
}

export default SliderPromo