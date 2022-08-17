import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { productHandler, searchProductsHandler } from "../../store/products";
import { useTranslation } from "react-i18next";
import { Button, Col, Row, Form, Card, CardGroup, FormControl, Container, Offcanvas } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./products.css";
import { CSpinner, CFormSelect, CRow, CCol, CButton } from '@coreui/react'
import ProductCard from "../ProductCardV2";


const Products = ({ productsData, productHandler, searchProductsHandler }) => {
  const { message, searchedProducts } = useSelector(state => state.products)
  const { parentCategory, childCategory, grandChildCategory } = useSelector(state => state.parent)
  const initialSearchQuery = {
    key: '',
    store_id: '',
    parent_category_id: '',
    child_category_id: '',
    grandchild_id: '',
    brand: '',
    price: ''
  }
  const [products, setProducts] = useState();
  const [store, setStore] = useState([]);
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true)
  const [firstLand, setFirstLand] = useState(true)
  const [show, setShow] = useState(true)
  const [searchQuery, setSearchQuery] = useState({
    key: '',
    store_id: '',
    parent_category_id: '',
    child_category_id: '',
    grandchild_id: '',
    brand: '',
    price: ''
  });
  const [Checked, setChecked] = useState([
    { category: "seller", id: [] },
    { category: "price", id: [] },
    { category: "brand", id: [] },
    { category: "color", id: [] },
  ]);


  let query = window.location.search.split(/[?,&,=]/);
  useEffect(() => {

  }, [searchQuery.key])
  const onChange = (e, v = {}) => {

    v[e.target.id] = e.target.value
    setSearchQuery(x => { return { ...x, ...v } })
  }

  useEffect(() => {
    let search = {}

    query.filter((val) => val).map((val, i, a) => i % 2 === 0 && (search[a[i]] = a[i + 1]))
    Promise.all([searchProductsHandler(search)]).then(() => { setLoading(false); setFirstLand(false) })
    setSearchQuery(x => { return { ...x, ...search } })
  }, []);

  useEffect(() => {
    let _store = []
    let _brand = searchedProducts.filter(((product, i, a) => i === a.findIndex(z => z.brand_name === product.brand_name) && product.brand_name)).map((product) => product.brand_name)
    brand.length === 0 && setBrand(() => _brand)

    searchedProducts && store.length === 0 && searchedProducts.map((product) => _store.push({ storeName: product.store_name, id: product.store_id }))

    _store.length && setStore(() => _store.filter((s, i, a) => i === a.findIndex(z => z.storeName === s.storeName)));
  }, [searchedProducts]);




  const submitHandler = e => {
    e.preventDefault();
    setLoading(true)
    setShow(false)
    searchQuery.key !== query.filter(value => value)[1] && setStore([]) && setBrand([])
    Promise.all([searchProductsHandler(searchQuery)]).then(() => setLoading(false))
  }


  const storeChangeHandler = e => {
    e.target.checked ? setSearchQuery(x => { return { ...x, store_id: [...x.store_id.split(','), e.target.id].filter(value => value).join(',') } }) :
      setSearchQuery(x => { return { ...x, store_id: [...x.store_id.split(',')].filter(value => value !== e.target.id).join(',') } })

  }
  const brandChangeHandler = e => {
    e.target.checked ? setSearchQuery(x => { return { ...x, brand: [...x.brand?.split(','), e.target.id].filter(value => value).join(',') } }) :
      setSearchQuery(x => { return { ...x, brand: [...x.brand.split(',')].filter(value => value !== e.target.id).join(',') } })

  }
  return (
    <div>
      <Row>


        <Col xs={5} sm={4} md={4} lg={3} xl={2} key='col1'>
          <div className="filter m-2rem" >
            {loading && firstLand ? <CSpinner /> : <Form onSubmit={submitHandler}>
              <label htmlFor="key">Search</label>
              <FormControl
                type="search"
                placeholder="Search for products"
                className="me-2"
                aria-label="Search"
                id='key'
                onChange={onChange}
                value={searchQuery.key}
                name='key'
              />
              {/* <input value={searchQuery.key} id='key' name='key' onChange={onChange} required /> */}
              {
                store.length !== 0 && <div className="mb-3 m-2rem">
                  {" "}
                  Seller
                  {
                    store.map(({ storeName, id }, index) => (
                      <Form.Check
                        key={`store${index}`}
                        type={"checkbox"}
                        id={id}
                        name={`seller`}
                        value={storeName}
                        label={storeName}
                        onChange={storeChangeHandler}
                      />
                    ))}
                </div>
              }

              {
                <div key={`Price`} className="mb-3 m-2rem">
                  {" "}
                  Price
                  {[
                    { name: "All", value: '' },
                    { name: "Under 15JO", value: '0-15' },
                    { name: "15JO to 30JO", value: '15-30' },
                    { name: "30JO to 45JO", value: '30-45' },
                    { name: "45JO to 60JO", value: '45-60' },
                    { name: "60JO & Above", value: '60-10000000' },

                  ].map(({ name, value }, index) => (
                    <Form.Check
                      key={`price${index}`}
                      type={"radio"}
                      id='price'
                      name={`price`}
                      value={value}
                      label={name}

                      onChange={onChange}
                      checked={searchQuery.price === value}
                    />
                  ))}
                </div>
              }

              {brand.length !== 0 && <div key={`Brand`} className="mb-3 m-2rem">
                {" "}
                Brand
                {brand.map(
                  (brand, index) => (
                    <Form.Check
                      key={`brand${index}`}
                      type="checkbox"
                      id={brand}
                      name='brand'
                      value={brand}
                      label={brand}
                      onChange={brandChangeHandler}
                    />
                  )
                )}
              </div>}
              {(!!searchQuery.parent_category_id || searchQuery.parent_category_id === '') && <div className="m-2rem"> <label>first category</label> <CFormSelect aria-label="Default select example" value={searchQuery.parent_category_id} id="parent_category_id" onChange={e => onChange(e, { child_category_id: '', grandchild_category_id: '' })}>
                <option value={''}>All</option>
                {parentCategory.length > 0 && parentCategory.map((val, i) => <option value={val.id} key={`parent${i}`}>{val.entitle}</option>)}

              </CFormSelect></div>}
              {searchQuery.parent_category_id && <div className="m-2rem"> <label>second category</label><CFormSelect aria-label="Default select example" value={searchQuery.child_category_id} id='child_category_id' onChange={e => onChange(e, { grandchild_category_id: '' })}>
                <option value={''}>All</option>
                {childCategory.length > 0 && childCategory.filter(x => x.parent_id === searchQuery.parent_category_id).map((val, i) => <option value={val.id} key={`child${i}`}>{val.entitle}</option>)}

              </CFormSelect></div>}
              {searchQuery.child_category_id && searchQuery.parent_category_id && <div className="m-2rem"> <label>third category</label><CFormSelect aria-label="Default select example" value={searchQuery.grandchild_category_id} id='grandchild_category_id' onChange={onChange}>
                <option value={''}>All</option>
                {grandChildCategory.length > 0 && grandChildCategory.filter(x => x.parent_id === searchQuery.child_category_id).map((val, i) => <option value={val.id} key={`grand${i}`}>{val.entitle}</option>)}

              </CFormSelect></div>}

              <Button variant='secondary' type='button' onClick={() => { setSearchQuery(initialSearchQuery); setBrand([]); setStore([]) }} style={{ width: '100%', margin: '1rem 0' }}>reset filter</Button>
              <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '1rem 0' }}>Search</Button>
              {/* <Button variant="success" >reset filter</Button> */}
            </Form>}
            {/* <Form onChange={(e) => handelToggle(e, "brand")}>
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
            </Form> */}
          </div>
        </Col>

        {loading ? <CSpinner color="primary" /> : <Col key='col2'>
          <h3>

            Results
          </h3>


          <Row>
            {searchedProducts &&
              searchedProducts.map((product, index) => (
                <Col lg={6} md={6} sm={12} xs={12} xl={4} xxl={3} style={{ margin: '2rem 0' }} key={`product${index}`} >
                  <ProductCard itemType='product' product={product} />

                </Col>
              ))}
          </Row>


        </Col>}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productsData: state.products ? state.products : null,
});
const mapDispatchToProps = { productHandler, searchProductsHandler };
export default connect(mapStateToProps, mapDispatchToProps)(Products);
