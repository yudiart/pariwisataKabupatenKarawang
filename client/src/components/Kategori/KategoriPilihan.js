import React from 'react'
import Slider from 'react-slick';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SchoolIcon from '@material-ui/icons/School';
const KategoriPilihan = ()=>{
    const NextArrow = (props)=>{
        const {currentSlide, slideCount, ...arrowProps} = props
        return(
            <div {...arrowProps} className={` kategoriPilihan__next-arrow`}>
                <ChevronRightIcon/>
            </div>
        )
    }
    const PrevArrow = (props)=>{
        const {currentSlide, slideCount, ...arrowProps} = props
        return(
            <div {...arrowProps} className="kategoriPilihan__prev-arrow">
                <ChevronLeftIcon/>
            </div>
        )}
    const settings = {
        dots:false,
        prevArrow: <NextArrow />,
        nextArrow: <PrevArrow />,
        infinite: true,
        speed: 100,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1385,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
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
        centerMode: true,
        slidesToScroll: 1,
    };

    const kategoriList = [
        {kategori:"Kesehatan", icon:<FavoriteIcon/>},
        {kategori:"Pendidikan", icon:<SchoolIcon/>},
        {kategori:"Makanan", icon:<FastfoodIcon/>},
        {kategori:"Kecantikan", icon:<LocalHospitalIcon/>},
        {kategori:"Fashion", icon:<BubbleChartIcon/>}
    ]
    return(
        <div className="product-kategori">
            <div className="product-items-kategori">
                <div className="header-kategori">
                    <h2>Kategori Pilihan</h2>
                </div>

                <Slider {...settings} className="kategori-items">
                        {kategoriList.map((item,index)=>(
                            <div className={`item`}  key={index}>
                                <i className="material-icons mdc-icon-button__icon" data-badge={10}>{item.icon}</i>
                                <h2>{item.kategori}</h2>
                            </div>
                        ))}
                </Slider>
                <div className="kategori-list">
                    {kategoriList.map((item,index)=>(
                        <div className="chip" key={index}>
                            <i className="material-icons mdc-icon-button__icon cart-header">{item.icon}</i>
                            <p>{item.kategori}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default KategoriPilihan