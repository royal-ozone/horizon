import React, { useState, useEffect } from "react";
import "./productCard.css";
import { connect } from 'react-redux'
import { addItem, decrementQuantity, incrementQuantity, deleteItem } from '../store/cart'
import { addProduct, deleteProduct } from '../store/wishlist'
import { If, Then, Else } from 'react-if'
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'


const ProfileCard = (props) => {
  const { addItem, decrementQuantity, incrementQuantity, deleteItem, cart, addProduct, deleteProduct, wishlist, itemType } = props

  const [addbag, setaddbag] = useState(1);
  const [heart, setheart] = useState(1);

  const AddBag = (product) => {
    let item = cart.filter(item => item.id === product.id)
    if (item[0]) {
      incrementQuantity(product)
    } else {
      addItem(product)
    }
  };
  const DecBag = () => {
    if (addbag >= 1) {
      setaddbag(addbag - 1);
    }
  };
  const Heart = (product) => {
    if (heart) {
      setheart(0);
      addProduct(product)
    } else {
      setheart(1);
      deleteProduct(product);
    }
  };
  const wishlistIds = wishlist.map(product => product.id)

  useEffect(() => {
    if (wishlistIds.includes(props.product.id)) {
      setheart(0);
    } else {
      setheart(1)
    }

  }, [])


  return (
    <>
      {/* <div className="container2">
    </div> */}
      <div className={'card' + ' ' + props.xclass}>

        <div className="top_part">
          {/* <div className="circle">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div> */}
          <small>
            <i
              onClick={() => Heart(props.product)}
              className={`fa ${heart ? "fa-heart-o" : "fa-heart"}`}
            // className={`fa ${!wishlistIds.includes(props.product.id)} ? "fa-heart-o" : "fa-heart"`}
            ></i>
          </small>
        </div>
        <div className="image">
          <img className="img" src={props.product.image} alt="Image" />
          {/* <p className="hover">{props.product.description}</p> */}
        </div>

        <div className="vitamin">
          <If condition={itemType === 'product'}>
            <Then>
              <Link to={`/product/${props.product.id}`}>
                <h3>{props.product.title}</h3>


              </Link>

            </Then>
            <Else>
              <h3>{props.product.title}</h3>
            </Else>
          </If>

        </div>
        <div className="reviews">
          {props.product.metaTitle ? (
            <p>{props.product.metaTitle}</p>
          ) : null}
        </div>
        {/* <div className="size">
                        <p>with Hyaluronic acid and Vitamin E</p>
                        <h5>Size : 1 FL Oz</h5>
                      </div> */}
        {/* <div className="buttons">
                        <button>1 FL Oz<p>1 option from $23</p></button>
                        <button>2 FL Oz<p>$43($21/FL Oz)</p></button>
                      </div> */}
        {/* <h4>Select Gender</h4>
                    <div className="gender">
                    <span>Man</span>
                    <span>Woman</span>
                    <span>Both</span>
                  </div> */}
        <div className="last">
          {/* <span className="boughtSpan">{props.product.bought} Bought</span> */}
          <StarRatings
            rating={props.product.rate || 2.403}
            starDimension="1.5rem"
            starSpacing=".05rem"
            starRatedColor="yellow"
          />
          <If condition={itemType === 'product'}>
            <Then>
              <div className="prices">
                {props.product.oldPrice ? (
                  <h4 className="oldprice">{props.product.oldPrice}</h4>
                ) : null}
                <h3 style={{ margin: "1rem" }}>{props.product.price}</h3>

              </div>
            </Then>
          </If>
          <If condition={itemType === 'seller'}>
            <Then>
              <Link to={`/store/${props.product.id}`}>
                <button className="visit">
                  Visit Store
                </button>

              </Link>
            </Then>
          </If>


          {/* <i onClick={DecBag} className="fa fa-minus"></i>
                            <p>{addbag}</p>
                          <i onClick={AddBag} className="fa fa-plus"></i> */}
        </div>

        <If condition={itemType === 'product'}>
          <Then>
            <div className="money_bag">
              <button onClick={() => AddBag(props.product)}><i className="fa fa-shopping-bag"></i>Add to cart</button>
            </div>

          </Then>

        </If>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  wishlist: state.wishlist

});

const mapDispatchToProps = { addItem, decrementQuantity, incrementQuantity, deleteItem, addProduct, deleteProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
