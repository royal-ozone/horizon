import React, { useState, useEffect }from "react";
import { connect } from "react-redux";
import {deleteProduct} from '../store/wishlist'
import {addItem} from '../store/cart'
import {If, Then, Else} from 'react-if'
const Wishlist = props =>{
    const {wishlist,deleteProduct, addItem, cart} = props
   
    const x = cart.map(w => w.id)

    // useEffect(() =>{
       
    //     setW(x)
    //   },[wishlist])
    return(
        <div className="wishlist">
            <h2 className="wishlistHead">Wishlist</h2>
            {wishlist.length > 0 ? wishlist.map(item =>
            <section className="cardw">
                <img src={item.image} alt="wishlist"/>
                <h3>{item.title}</h3>
                <div className="btnContainer">
                    <div className="money_bag">
                        <If condition={!x.includes(Number(item.id))}>
                 
                            <Then>
                                <button onClick={() =>addItem({...item, qty: 1})}><i className="fa fa-shopping-bag"/>Move to Card</button>
                            </Then>
                            <Else>
                                <button disabled onClick={() =>addItem({...item, qty: 1})}><i className="fa fa-shopping-bag"/>In your Card</button>
                            </Else>
                        </If>
                    {/* <button onClick={() =>addItem({...item, qty: 1})}><i className="fa fa-shopping-bag"/>Move to Card</button> */}
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
    wishlist: state.wishlist,
    cart: state.cart
})

const mapDispatchToProps = {deleteProduct,addItem}
export default connect(mapStateToProps,mapDispatchToProps)(Wishlist)