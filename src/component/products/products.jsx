import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { productHandler } from "../../store/products";
import { useTranslation } from "react-i18next";
import { Button, Col, Row, Form, Card, CardGroup } from "react-bootstrap";
import "./products.css";

const Products = (props) => {
  const [products, setProducts] = useState();
  const [store, setStore] = useState([]);
  const [brand, setBrand] = useState([]);
  const [Checked, setChecked] = useState([
    { category: "seller", id: [] },
    { category: "price", id: [] },
    { category: "brand", id: [] },
    { category: "color", id: [] },
  ]);
  
  const [Filter, setFilter] = useState([
    {
      seller: [],
      price: [],
      brand: [],
      color: [],
    },
  ]);
  let query = window.location.search.split(/[?,&,=]/);
  
  const { productsData, productHandler } = props;
  
  useEffect(() => {
    productHandler(query);
    console.log("1");
  }, []);
  
  useEffect(() => {
    products && products.map((product) => store.push(product.store_name));
    let storeArray = [...new Set(store)];
    
    setStore(storeArray);
  }, [products]);
  
  useEffect(() => {
    setProducts(
      productsData.productCategory && productsData.productCategory.result
      );
      console.log("3");
    }, [productsData.productCategory]);
    
    const handleFilter = (data) => {
      console.log("🚀 ~ file: products.jsx ~ line 38 ~ useEffect ~ products", products)
    console.log("🚀 ~ file: products.jsx ~ line 51 ~ handleFilter ~ data", data)
   
      
        let newFilter ;
        data[0].id.map((el)=>{
          let ee = products.filter(product => product.store_name === el)
          console.log("🚀 ~ file: products.jsx ~ line 58 ~ sellerData ~ ee", ee)  
          newFilter = newFilter ? [...newFilter,ee] : ee;
        })
        data[1].id.map((el)=>{
          console.log("🚀 ~ file: products.jsx ~ line 62 ~ data[1].id.map ~ el", el)
          if(el.includes('Under')){
            let ee = newFilter && newFilter.filter(product => product.price  < 15 )
            newFilter = newFilter ? ee : products.filter(product => product.price < 15 );
            console.log("🚀 ~ file: products.jsx ~ line Under ~ data[1].id.map ~ ee", ee)
          }else if(el.includes('One')){
            let ee = newFilter && newFilter.filter(product => product.price  >= 15 && product.price  < 30 )
            newFilter = newFilter ? [...newFilter,ee] : products.filter(product => product.price  >= 15 && product.price  < 30 );
            console.log("🚀 ~ file: products.jsx ~ line One ~ data[1].id.map  price ~ ee", ee)
          }
          else if(el.includes('Two')){
            let ee =newFilter && newFilter.filter(product => product.price  >= 30 && product.price  < 45)
            console.log("🚀 ~ file: products.jsx ~ line Two ~ data[1].id.map ~ ee", ee)
          }
          else if(el.includes('Three')){
            let ee =newFilter && newFilter.filter(product => product.price  >= 45 && product.price  < 60)
            console.log("🚀 ~ file: products.jsx ~ line Three ~ data[1].id.map ~ ee", ee)
          }
          else if(el.includes('Above')){
            let ee =newFilter && newFilter.filter(product => product.price  >= 60 )
            console.log("🚀 ~ file: products.jsx ~ line Above ~ data[1].id.map ~ ee", ee)
          }
        })
        console.log("🚀 ~ file: products.jsx ~ line 55 ~ handleFilter ~ newFilter", newFilter)
    
    if (data[0].id.length ===0 &&data[1].id.length===0 &&data[2].id.length===0 &&data[3].id.length===0 ) {
      console.log("🚀 ~ file:")
      setProducts(
        productsData.productCategory && productsData.productCategory.result
      );
    }
  };

  const handelToggle = (event, category) => {
    let id = event.target.id;
    const newChecked = [...Checked];
    
    newChecked &&
      newChecked.map((array, index) => {
        if (array.category && array.category === category) {
          const currentIndex =
          Checked[index].id && Checked[index].id.indexOf(id);
          if (currentIndex === -1) {
            array.id.push(id);
          } else {
            array.id.splice(currentIndex, 1);
          }
        }
      });
      
      console.log("🚀 ~ file: products.jsx ~ line 98 ~ handelToggle ~ newChecked", newChecked)
    setChecked(newChecked);
    handleFilter(newChecked);
  };

  // const sellerFilterHandler =(e)=>{

  //   if(e.target.checked === true){

  //     let filter = products.filter(p => p.store_name === e.target.value);

  //     setProducts(filter);

  //   }else {

  //     setProducts(productsData.productCategory&&productsData.productCategory.result);
  //   }

  // }
  return (
    <div>
      <Row>
        <Col xs={2}>
          <div className="filter">
            <Form onChange={(e) => handelToggle(e, "seller")}>
              {
                <div key={`Store`} className="mb-3">
                  {" "}
                  Seller
                  {store &&
                    store.map((storeName, index) => (
                      <Form.Check
                        key={index}
                        type={"checkbox"}
                        id={`${storeName}`}
                        name={`seller`}
                        value={storeName}
                        label={`${storeName}`}
                      />
                    ))}
                </div>
              }
            </Form>
            <Form onChange={(e) => handelToggle(e, "price")}>
              {
                <div key={`Price`} className="mb-3">
                  {" "}
                  Price
                  {[
                    "Under 15JO",
                    "One 15JO to 30JO",
                    "Two 30JO to 45JO",
                    "Three 45JO to 60JO",
                    "60JO & Above",
                  ].map((price, index) => (
                    <Form.Check
                      key={index}
                      type={"radio"}
                      id={`${price}`}
                      name={`price`}
                      value={price}
                      label={`Price-${price}`}
                      unchecked
                    />
                  ))}
                </div>
              }
            </Form>
            <Form onChange={(e) => handelToggle(e, "brand")}>
              {
                <div key={`Brand`} className="mb-3">
                  {" "}
                  Brand
                  {["BeastOffice", "VICTONE", "Comfty", "YSSOA", "OFM"].map(
                    (brand, index) => (
                      <Form.Check
                        key={index}
                        type={"checkbox"}
                        id={`${brand}`}
                        name={`brand`}
                        value={brand}
                        label={` ${brand}`}
                      />
                    )
                  )}
                </div>
              }
            </Form>
            <Form onChange={(e) => handelToggle(e, "color")}>
              {
                <div key={`Color`} className="mb-3">
                  {" "}
                  Color
                  {["red", "black", "pink", "blue", "purple"].map(
                    (color, index) => (
                      <Form.Check
                        key={index}
                        type={"checkbox"}
                        id={`${color}`}
                        name={`color`}
                        value={color}
                        label={` ${color}`}
                      />
                    )
                  )}
                </div>
              }
            </Form>
          </div>
        </Col>

        <Col>
          Result
          <CardGroup>
            {products &&
              products.map((product, index) => (
                <div key={index}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={
                        product.pictures[0] &&
                        product.pictures[0].product_picture
                      }
                    />
                    <Card.Header>{`-${
                      product.discount_rate * 100
                    }%`}</Card.Header>
                    <Card.Body>
                      <Card.Title>{product.entitle}</Card.Title>
                      <Card.Text>{product.endescription}</Card.Text>
                      <Card.Title className="line-thro">
                        {" "}
                        {`${product.price}JO`}
                      </Card.Title>
                      <Card.Title>
                        {" "}
                        {`${
                          product.price - product.discount_rate * product.price
                        }JO`}
                      </Card.Title>
                      <Button as="inline">Add to cart</Button>{" "}
                      <Button as="inline">Details</Button>{" "}
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Last updated {product.created_at} ago
                      </small>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productsData: state.products ? state.products : null,
});
const mapDispatchToProps = { productHandler };
export default connect(mapStateToProps, mapDispatchToProps)(Products);
