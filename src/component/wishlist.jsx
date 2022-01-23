import React from "react";
import { connect } from "react-redux";
import {deleteProduct} from '../store/wishlist'
import {addItem} from '../store/cart'
const Wishlist = props =>{
    const {wishlist,deleteProduct, addItem} = props
    return(
        <div className="wishlist">
            <h2 className="wishlistHead">Wishlist</h2>
            {wishlist.length > 0 ? wishlist.map(item =>
            <section className="cardw">
                <img src={item.image} alt="wishlist"/>
                <h3>{item.title}</h3>
                <div className="btnContainer">
                    <div className="money_bag">
                    <button onClick={() =>addItem(item)}><i className="fa fa-shopping-bag"/>Move to Card</button>
                    </div>
                    <div className="removeBtn ">
                    <button className="removeWishlist" onClick={() =>deleteProduct(item)}>Remove</button>

                    </div>
                </div>
            </section>

    
            ): <h3 className="cartHeader">Your wishlist is empty</h3>}
        </div>
    )
}
const mapStateToProps = (state) =>({
    wishlist: state.wishlist
})

const mapDispatchToProps = {deleteProduct,addItem}
export default connect(mapStateToProps,mapDispatchToProps)(Wishlist)