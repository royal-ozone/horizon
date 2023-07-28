import React from "react";
import ProfileCard from "./productCard"

const ProductView = (props) => {
    return(
        <div className="mainDeals">
            <div className="mainDiv">
                <a href="#">
            <h2 className="FH">{props.title}</h2>

                </a>
            <button className="FDB">{`View More >`}</button>

            </div>
            <div className="deals">
               { props.product.map((product, index) => 
                    <ProfileCard key={product.title+index} product={product} xclass={props.xclass} itemType='product'/>
                )}
            </div>
        </div>
    )
}

export default ProductView