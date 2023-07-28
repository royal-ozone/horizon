import React, { useState, useEffect } from "react";
import "./productCard.css";
import { connect } from 'react-redux'
import { addItem, decrementQuantity, incrementQuantity, deleteItem, addCartItemHandler ,updateCartItemHandler} from '../store/cart'
import { addProduct, deleteProduct } from '../store/wishlist'
import { If, Then, Else } from 'react-if'
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form';
import image from '../assets/no-image.png'
import { Col, Container, Row } from "react-bootstrap";
import { addItemHandler, deleteItemHandler,  } from '../store/wishlist'


const ProfileCard = ({ cart, wishlist, itemType, addCartItemHandler, product, key, xclass, addItemHandler, deleteItemHandler, pic,updateCartItemHandler }) => {

  const dispatch = useDispatch();
  const [addbag, setaddbag] = useState(1);
  const [heart, setheart] = useState(1);
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(null)
  const AddBag = (product) => {
    let item = cart.find(item => (item.product_id === product.id || item.id === product.id) && item.color === color && item.size === size);
    if (item) {
      updateCartItemHandler({ ...item, quantity: item.quantity + 1 })
    } else {
      addCartItemHandler({ ...product, quantity: 1, color: color, size: size })
    }
    toast("added to your cart")
  };
  const DecBag = () => {
    if (addbag >= 1) {
      setaddbag(addbag - 1);
    }
  };
  const Heart = (product) => {
    if (heart) {
      setheart(0);
      addItemHandler(product)
    } else {
      setheart(1);
      deleteItemHandler(product)
    }
  };

  useEffect(() => {
    // if (wishlist.find( x=> x.id === product.id || x.product_id === product.id)) {
    //   setheart(0);
    // } else {
    //   setheart(1)
    // }
    const arr = JSON.parse(product.size_and_color)
    if (arr?.length > 0) {
      let _colors = arr.filter((v, i, a) => i === a.findIndex(x => x.color === v.color) && v.quantity ).map(v => v.color).filter(value=> value)
      let _sizes = arr.filter((v, i, a) => i === a.findIndex(x => x.size === v.size) && v.quantity).map(v => v.size).filter(value=> value)
      if (_sizes.length > 0 && _colors.length > 0) {

        setSizes(() => _sizes)
        setSize(() => _sizes[0])
      } else if (_sizes.length > 0 && _colors.length === 0) {
        setSizes(() => _sizes)
        setSize(() => _sizes[0])
      } else if (_sizes.length === 0 && _colors.length > 0) {
        setColors(() => _colors)
        setColor(() => _colors[0])

      }
      // setColors(() => _colors)
      // setColor(() => _colors[0])
      // setSizes(() => _sizes)
      // setSize(()=> _sizes[0])
    }
  }, [])
  useEffect(() => {
    const arr = JSON.parse(product.size_and_color)
    let _colors = arr?.filter((v, i, a) => i === a.findIndex(x => x.color === v.color && v.size === size && v.quantity)).map(v => v.color).filter(value => value)
    if (_colors?.length > 0) {
      setColors(() => _colors)
      setColor(() => _colors[0])
    }
  }, [size])
  useEffect(() => {
    if (wishlist.find(x => x.id === product.id || x.product_id === product.id)) {
      setheart(0);
    } else {
      setheart(1)
    }
  }, [wishlist])
  



  return (
    <>
      {/* <div className="container2">
    </div> */}
      <div className={'card' + ' ' + xclass} key={key}>

        <div className="top_part">
          {/* <div className="circle">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div> */}
          <small>
            <i
              onClick={() => Heart(product)}
              className={`fa ${heart ? "fa-heart-o" : "fa-heart"}`}
            // className={`fa ${!wishlistIds.includes(product.id)} ? "fa-heart-o" : "fa-heart"`}
            ></i>
          </small>
        </div>
        <div className="image2">
          <img className="img" src={pic === 'array' ? product.pictures[0]?.product_picture ?? image : (product.pictures?.product_picture ?? image)} alt="Image" />
        </div>

        <div className="vitamin">
          <If condition={itemType === 'product'}>
            <Then>
              <Link to={`/product/${product.id}`}>
                <h3>{product.entitle}</h3>


              </Link>

            </Then>
            <Else>
              <h3>{product.entitle}</h3>
            </Else>
          </If>
        </div>
        <Row>
          <Col md={{ span: 11, offset: 1 }}>
            {product.store_name && <>store : {<Link to={`/store/${product.store_id}`}>
              <small>{product.store_name}</small>
            </Link>}</>}

          </Col>
        </Row>
        <div className="reviews">

          {product.metatitle ? (
            <p>{product.metatitle}</p>
          ) : null}
        </div>
    

        <Row style={{ padding: '0 2px' }}>
          <Col xs={4} sm={4} md={5} lg={4} xl={4}>
            {sizes.length > 0 && <>
              <Form.Group className="mb-3" >
                <Form.Label>size</Form.Label>
                <Form.Select id='size' onChange={e => setSize(e.target.value)}>
                  {sizes.map((size, i) =>
                    <option key={`size${i}`} value={size} >{size}</option>

                  )}

                </Form.Select>
              </Form.Group>
            </>}
          </Col>
          <Col xs={{ span: 5, offset: 3 }} md={{ span: 7, offset: 0 }} lg={{ span: 5, offset: 3 }} xl={{ span: 6, offset: 2 }}>
            {colors.length > 0 && <>
              <Form.Group className="mb-3" >
                <Form.Label>Color</Form.Label >
                <Form.Select id='color' onChange={e => setColor(e.target.value)}>
                  {colors.map((color, i) =>
                    <option key={`color${i}`} value={color}>{color}</option>

                  )}

                </Form.Select>
              </Form.Group>
            </>}
          </Col>
        </Row>

        <div className="last">
          {/* <span className="boughtSpan">{product.bought} Bought</span> */}
          <StarRatings
            rating={Number(product?.rate) || 0}
            starDimension="1.5rem"
            starSpacing=".05rem"
            starRatedColor="yellow"
          />
          <If condition={itemType === 'product'}>
            <Then>
              <div className="prices">
                {product.discount ? (
                  <h4 className="oldprice">{product.price}</h4>
                ) : null}
                <h3 style={{ margin: "1rem" }}>{(product.price * (1 - product.discount_rate)).toFixed(2)}</h3>

              </div>
            </Then>
          </If>
          <If condition={itemType === 'seller'}>
            <Then>
              <Link to={`/store/${product.id}`}>
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
              <button onClick={() => AddBag(product)} disabled={product.quantity <= 0}><i className="fa fa-shopping-bag" ></i>{product.quantity <= 0 ? 'out of stock' : 'Add to cart'}</button>
              <ToastContainer position="bottom-right" />
            </div>

          </Then>

        </If>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  wishlist: state.wishlist.items

});

const mapDispatchToProps = { addCartItemHandler, addItemHandler, deleteItemHandler,updateCartItemHandler };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
