import React, {useEffect,useState} from "react";
import { Carousel } from 'react-carousel-minimal';
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'
import featuredDeals from '../static-data/FeaturedAucklandDeals'
import StarRatings from 'react-star-ratings';
const Product = props =>{
    let id = useParams().id
    const [product, setProduct] = useState({})
    useEffect(() => {
        let pro = featuredDeals.filter(item => item.id === id)[0]
        setProduct(pro)
    },[])

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }
    return (
        <div className="product">
            <Carousel data={featuredDeals}
             width="35rem"
             height="20rem"
             captionStyle={captionStyle}
             radius="10px"
            
             captionPosition="bottom"
             pauseIconColor="white"
             pauseIconSize="40px"
             
             slideImageFit="cover"
             thumbnails={true}
             thumbnailWidth="100px"
             style={{
               textAlign: "left",
               maxWidth: "850px",
               maxHeight: "500px",
               margin: "40px 0",  }}/>
               <section className="content">
                    <h3 className="productHead">
                    {product.title}
                    </h3>
               </section>
        </div>
    )
}

const mapStateToProps = (state) => ({

})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

