import React, { useEffect, useState } from "react";
import mainProduct from "../static-data/mainProduct"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import {Tabs,Tab, Sonnet} from 'react-bootstrap'
import FeaturedDeals from "./featuredDeals";
import Image from 'react-bootstrap/Image'
import ProductCard from "./productCard";
import featuredDeals from '../static-data/FeaturedAucklandDeals'
import escapes from '../static-data/escapes'
import Automotive from '../static-data/Automotive'
const Seller = props => {
    const [seller, setSeller] = useState({})
    console.log("🚀 ~ file: seller.jsx ~ line 8 ~ seller", seller)
    const id = Number(useParams().id)
    console.log("🚀 ~ file: seller.jsx ~ line 10 ~ id", id)

    useEffect(() => {
        let s = mainProduct.filter(x => x.id === id)[0]
        console.log("🚀 ~ file: seller.jsx ~ line 14 ~ useEffect ~ mainProduct", mainProduct)
        setSeller(s)
    }, [])

    return (
        <div className="seller">
            <section>

                {/* <img className='sellerAvatar' src={seller.image} alt="avatar" /> */}
                <Image src={seller.image} alt="avatar" thumbnail={true} rounded={true} />
                <div className="sellerDetails">
                    <h3>{seller.title}</h3>
                    <StarRatings
                        rating={seller.rate || 2.403}
                        starDimension="1.5rem"
                        starSpacing=".05rem"
                        starRatedColor="yellow"
                    />
                    <p>
                        {seller.description}
                    </p>
                </div>

            </section>
             <hr />
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Home">
                    <h3>Welcome to out store</h3>
                   <p>Take all my loves, my love, yea take them all; What hast thou then more than thou hadst before? No love, my love, that thou mayst true love call; All mine was thine, before thou hadst this more. Then, if for my love, thou my love receivest, I cannot blame thee, for my love thou usest; But yet be blam'd, if thou thy self deceivest By wilful taste of what thyself refusest. I do forgive thy robbery, gentle thief, Although thou steal thee all my poverty:</p>
                </Tab>
                <Tab eventKey="Products" title="Products">
                  <h2 className="productstHead">Our Products</h2>
                  <div className="sellerProducts">
                        {[...featuredDeals,...Automotive,...escapes].map(product =>
                       
                            <ProductCard product={product} xclass='FDP' itemType='product'/>

                       
                        )
                        }
                  </div>

                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                   <p>Take all my loves, my love, yea take them all; What hast thou then more than thou hadst before? No love, my love, that thou mayst true love call; All mine was thine, before thou hadst this more. Then, if for my love, thou my love receivest, I cannot blame thee, for my love thou usest; But yet be blam'd, if thou thy self deceivest By wilful taste of what thyself refusest. I do forgive thy robbery, gentle thief, Although thou steal thee all my poverty:</p>
                </Tab>
            </Tabs>

        </div>
    )
}

export default Seller;

