import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { productHandler } from "../../store/products";
import { useTranslation } from "react-i18next";
import { Button, Col, Row, Form ,Card ,CardGroup} from "react-bootstrap";
import "./products.css";

const Products = (props) => {
  const [products, setProducts] = useState();
  console.log("🚀 ~ file: products.jsx ~ line 10 ~ Products ~ products", products)
  const { productsData, productHandler } = props;
  
  useEffect(() => {
      productHandler();
    }, []);
    useEffect(() => {
        setProducts(productsData.product.result);
    }, [productsData]);

  return (
    <div>
      <Row>
        <Col xs={2}>
        <div className="filter">
            
          <Form>
            {
              <div key={`Store`} className="mb-3">
                {" "}
                Store
                {["one", "two", "three"].map((type2) => (
                    <Form.Check
                    type={type2}
                    id={`default-${type2}`}
                    label={`Store - ${type2}`}
                    />
                    ))}
              </div>
            }
            {
              <div key={`Price`} className="mb-3">
                {" "}
                Price
                {[
                    "Under 15JO",
                  "15JO to 30JO",
                  "30JO to 45JO",
                  "45JO to 60JO",
                  "60JO & Above",
                ].map((type2) => (
                  <Form.Check
                    type={type2}
                    id={`default-${type2}`}
                    label={`Price - ${type2}`}
                    />
                    ))}
              </div>
            }
            {
                <div key={`Brand`} className="mb-3">
                {" "}
                Brand
                {["BeastOffice", "VICTONE", "Comfty", "YSSOA", "OFM"].map(
                    (type2) => (
                        <Form.Check
                        type={type2}
                        id={`default-${type2}`}
                        label={` ${type2}`}
                        />
                        )
                        )}
              </div>
            }
            {
                <div key={`Color`} className="mb-3">
                {" "}
                Color
                {["red", "black", "pink", "blue", "purple"].map((type2) => (
                    <Form.Check
                    type={type2}
                    id={`default-${type2}`}
                    label={` ${type2}`}
                    />
                    ))}
              </div>
            }
          </Form>
            </div>
        </Col>
        
        <Col>
        Result
        <CardGroup>
            {products&&products.map((product)=>(
                <div>

                <Card>
                <Card.Img variant="top" src={product.pictures[0].product_picture} />
                <Card.Header >{`-${product.discount_rate *100}%`}</Card.Header>
                <Card.Body>
                  <Card.Title>{product.entitle}</Card.Title>
                  <Card.Text>
                        {product.endescription}
                  </Card.Text>
                  <Card.Title className="line-thro" > {`${product.price}JO`}</Card.Title>
                  <Card.Title> {`${(product.price -(product.discount_rate)*(product.price))}JO`}</Card.Title>

                  <Button as="inline">Add to cart</Button> {' '}
                  <Button as="inline">Details</Button>{' '}
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
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
