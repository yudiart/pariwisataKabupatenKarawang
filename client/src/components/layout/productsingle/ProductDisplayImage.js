import React from 'react'

const ProductDisplayImage = (props)=>{
    let {ids,onChange,images, img} = props
    return(
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
    )
}

export default ProductDisplayImage