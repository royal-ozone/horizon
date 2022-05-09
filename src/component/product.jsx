import React, { useEffect, useState } from "react";
import { Carousel } from 'react-carousel-minimal';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import featuredDeals from '../static-data/FeaturedAucklandDeals'
import StarRatings from 'react-star-ratings';
import { addItem } from '../store/cart';
import { addProduct } from '../store/wishlist'
import { If, Then, Else } from 'react-if'
const Product = props => {
  const { cart, wishlist, addItem, addProduct } = props
  let id = Number(useParams().id)

  const [product, setProduct] = useState({})
  const [qty, setQty] = useState(1)
  const [c, setC] = useState(null)
  const [w,setW] = useState(null)
  
  useEffect(() => {
    
    setProduct(pro => featuredDeals.filter(item => item.id === id)[0])
    
  }, [])
  useEffect(() =>{
    const i = cart.filter(x => x.id === product.id)[0]
    setC(i)
  },[cart])
  useEffect(() =>{
    const x = wishlist.filter(w => w.id === product.id)[0]
    setW(x)
  },[wishlist])

  useEffect(() => {
    const i = cart.filter(x => x.id === product.id)[0]
   
    const x = wishlist.filter(w => w.id === product.id)[0]
    
    setC(i)
    setW(x)
  }, [product])
  const incrementQuantity = () => {
    let x = qty;
    x++
    setQty(x)

  }
  const decrementQuantity = () => {
    let x = qty;
    x--

    setQty(() => x < 0 ? 0 : x)
  }
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
          margin: "40px 0",
        }} />
      <section className="productContent">
        <h3 className="productHead">
          {product.title}
        </h3>
        <StarRatings
          rating={product.rate || 2.403}
          starDimension="1.5rem"
          starSpacing=".05rem"
          starRatedColor="yellow"
        />
        <h5 className="productPrice">Price: {product.price}</h5>
        <p className="productDescription">Description: {product.description}</p>
      </section>
      <section className="productAction">
        <If condition={!c}>
          <Then>
            <div className="icCart"><button className="btn" onClick={() => { decrementQuantity() }}>-</button><span className="in">{qty}</span><button className="btn" onClick={() => { incrementQuantity() }}>+</button></div>
            <div className="money_bag">

              <button  onClick={() => addItem({ ...product, qty: qty })}><i className="fa fa-shopping-bag"></i>Add to cart</button>

            </div>

          </Then>
          <Else>
            <div className="money_bag">

              <button disabled onClick={() => addItem({ ...product, qty: qty })}><i className="fa fa-shopping-bag"></i>Added to cart</button>

            </div>
          </Else>
        </If>
        <div >
          
          <div className="wishlistBtn">
            <If condition={!w}>
              <Then>
                <button className="WLB" onClick={() => addProduct(product)}>
                  <img src="https://img.icons8.com/ios/20/000000/like--v2.png" />{' '}
                  Add to wishlist

                </button>

              </Then>
              <Else>
                <button disabled className="WLB" onClick={() => addProduct(product)}>
                  <img src="https://img.icons8.com/ios-filled/20/000000/like--v1.png" />{' '}
                  Added to wishlist

                </button>

              </Else>
            </If>

          </div>

        </div>
      </section>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  wishlist: state.wishlist
})
const mapDispatchToProps = { addItem, addProduct }

export default connect(mapStateToProps, mapDispatchToProps)(Product);

