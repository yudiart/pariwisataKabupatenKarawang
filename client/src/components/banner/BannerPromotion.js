import React from 'react'
import Slider from "react-slick";

const BannerPromotion = (props)=>{


    const NextArrow = (props)=>{
        const {currentSlide, slideCount, ...arrowProps} = props
        return(
            <div {...arrowProps} className="banner__next-arrow">
                <i className="material-icons mdc-icon-button__icon">keyboard_arrow_right</i>
            </div>
        )
    }
    const PrevArrow = (props)=>{
        const {currentSlide, slideCount, ...arrowProps} = props
        return(
            <div {...arrowProps} className="banner__prev-arrow">
                <i className="material-icons mdc-icon-button__icon">keyboard_arrow_left</i>
            </div>
    )}

    const settings = {
        infinite: true,
        speed: 200,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToShow: 1,
        autoplaySpeed: 3000,
        slidesToScroll: 1,
        padding:20
    };

    let {promo} = props

    const SliderPromo =(
        <>
            <Slider {...settings} className="card-promos">
                {promo.map((item,index)=>{
                    return(
                        <div className="card-promo" key={index}>
                            <div className="card-promo-image" onClick={()=>{
                                console.log('Push')}}>
                                <img src={item.images[0]} alt={item.images[0]}/>
                            </div>
                            <div className="card-promo-details">
                                {/*<h2>Lorem ipsum dolor sit amet</h2>*/}
                            </div>
                        </div>
                    )})}
            </Slider>
        </>
    )
    return(
        <div className="box-promo">
            <div className="header-promo">
                <h2>Product Promo</h2>
            </div>
            {SliderPromo}
        </div>
    )
}

export default BannerPromotion