import React from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import {addItem,decrementQuantity,incrementQuantity,deleteItem} from '../store/cart'
const Cart = (props) => {
const { addItem,decrementQuantity,incrementQuantity,deleteItem, cart} = props

const qtyChangeHandler = (item) => {
    if(item.qty ===1){
        deleteItem(item)
    } else{
        decrementQuantity(item)
    }
  }
  const submitHandler = e =>{
    e.preventDefault()
  console.log("🚀 ~ file: cart.jsx ~ line 14 ~ qtyChangeHandler ~ e", e.target)
    let subTotal = Number(document.getElementById('subTotal').innerHTML.split(':')[1])
    console.log("🚀 ~ file: cart.jsx ~ line 18 ~ Cart ~ subTotal", subTotal)
    // return(
    //   <Redirect to='/'/>
    // )
    window.location = '/'
  }
  return (
    <div className="cart">
        {cart.length > 0? 
        <section>
          <form id='checkoutForm' className='checkoutForm'  onSubmit={submitHandler}>

      <table>
        {/* <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>

        </thead> */}
        {cart.map(item =>
        <tbody>
        <tr>
          <td><img src={item.image} alt="" className="cartImg" /></td>
          <td>{item.title}</td>
          <td>{item.price}</td>
          <td><div className="btns"><button className="btn" type='button' onClick={() =>{qtyChangeHandler(item)}}>-</button><span className="in">{item.qty}</span><button  type='button' className="btn" onClick={() =>{incrementQuantity(item)}}>+</button></div></td>
          <td>{Number(item.price.slice(1)) * item.qty}</td>
       
        </tr>

        </tbody>
        )}
        <tfoot>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th><strong id='subTotal' className="subTotal">Subtotal: {cart.reduce((x,y)=>{return x+= Number(y.price.slice(1)) * y.qty},0)}</strong></th>
        </tr>

        </tfoot>
      </table>
      {/* <strong id='subTotal' className="subTotal">Subtotal: {cart.reduce((x,y)=>{return x+= Number(y.price.slice(1)) * y.qty},0)}</strong> */}
          <button type="submit" className="checkout">Proceed to checkout</button>
          </form>
        
            {/* <strong className="subTotal">Subtotal: {cart.reduce((x,y)=>{return x+= Number(y.price.slice(1)) * y.qty},0)}</strong> */}
            </section>
            : <h3 className="cartHeader">Your cart is empty</h3>}
    </div>
  );
};

const mapStateToProps = (state) => ({
    cart: state.cart
  
  });

const mapDispatchToProps = { addItem,decrementQuantity,incrementQuantity,deleteItem};


export default connect(mapStateToProps,mapDispatchToProps)(Cart);
