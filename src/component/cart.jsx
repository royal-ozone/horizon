import React from "react";
import {connect} from 'react-redux'
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
  return (
    <div className="cart">
        {cart.length > 0? 
        <section>
      <table>
        <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>

        </thead>
        {cart.map(item =>
        <tbody>
        <tr>
          <td><img src={item.image} alt="" className="cartImg" /></td>
          <td>{item.title}</td>
          <td>{item.price}</td>
          <td><div className="btns"><button className="btn" onClick={() =>{qtyChangeHandler(item)}}>-</button><span className="in">{item.qty}</span><button className="btn" onClick={() =>{incrementQuantity(item)}}>+</button></div></td>
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
          <th><strong className="subTotal">Subtotal: {cart.reduce((x,y)=>{return x+= Number(y.price.slice(1)) * y.qty},0)}</strong></th>
        </tr>

        </tfoot>
        
      </table>
            <strong className="subTotal">Subtotal: {cart.reduce((x,y)=>{return x+= Number(y.price.slice(1)) * y.qty},0)}</strong>
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
