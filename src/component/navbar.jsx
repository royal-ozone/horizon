import React , { useState, useEffect }from "react";
import { Navbar, Container, Nav, NavDropdown,DropdownButton,ButtonGroup,Dropdown, Form, FormControl,Button } from "react-bootstrap";
import {connect} from 'react-redux';
import {parentCategoryHandler} from '../store/parent';
const MainNavbar = (props) => {
  const {parentCategoryHandler,childCategoryHandler,grandChildCategoryHandler,productHandler,parentData} = props;
  const [parent,setParent] =useState([]);
  const [specificParent,setSpecificParent] =useState();
  const [child,setChild] =useState([]);
  const [grandChild,setGrandChild] =useState([]);
  const [product,setProduct] =useState([]);
  
  
  useEffect(  () => {
    parentCategoryHandler();  
  },[]);
  
  
  useEffect(() => {
    setParent(parentData.parentCategory);
    setChild(parentData.childCategory);
    setGrandChild(parentData.grandChildCategory);
  },[parentData])

  const childHandler= (parent)=>{
  console.log("🚀 ~ file: navbar.jsx ~ line 25 ~ childHandler ~ parent", parent.target.id)
     let filter =child&& child.response.filter(el => el.parent_id === parent.target.id);
     console.log("🚀 ~ file: navbar.jsx ~ line 26 ~ childHandler ~ filter", filter)
     setSpecificParent(filter);
}
  const grandChildHandler =(child)=>{
    
    let filter = grandChild && grandChild.response.filter(el => el.parent_id ===child.target.id);
    console.log("🚀 ~ file: navbar.jsx ~ line 33 ~ grandChildHandler ~ filter", filter)
    setSpecificParent(filter);

  }
  const productCategory =(params)=>{
    let {G,C,P}=params;
    console.log("🚀 ~ file: navbar.jsx ~ line 40 ~ productCategory ~ params", params)
    parentCategoryHandler(G,C,P);  
    setProduct(parentData.productCategory)
    
    console.log("🚀 ~ file: navbar.jsx ~ line 44 ~ productCategory ~ product", product)
  }
  return (
    <div zIndex='2px'>
    <Navbar bg="light" variant="light">
      <Container>
        <Nav className="me-auto">
          {parent.response?parent.response.map((el)=>(
           
            <NavDropdown id={el.id} title={el.entitle}> 

            {child.response.filter(v => v.parent_id === el.id).map((el2)=>(
              
              <>
              
              { grandChild.response.filter(v2 => v2.parent_id ===el2.id).length >0?grandChild.response.filter(v2 => v2.parent_id ===el2.id).map((el3)=>(
                <NavDropdown href='' id={el2.id} title={el2.entitle}>
                  
                  <Nav.Link href={`/products?parent_id=${el.id}&child_id=${el2.id}&grandChild_id=${el3.id}`}> {el3.entitle}
                  </Nav.Link>
                  
              </NavDropdown>
                )): 
                <Nav.Link href={`/products?parent_id=${el.id}&child_id=${el2.id}`} > {el2.entitle}
                  </Nav.Link>
                }
                </>

            ))}

            </NavDropdown>
          )):null}
          <Nav.Link href='javascript:void(0)'>What's New</Nav.Link>
          <Nav.Link href="#features">Trending</Nav.Link>
          <Nav.Link href="#pricing">For You</Nav.Link>
          <Nav.Link href="#pricing">Shop Products</Nav.Link>
        </Nav>
        <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search GrabOne"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      </Container>
    </Navbar>

    </div>
  );
};
const mapStateToProps = (state) => ({
  parentData: state.parent?state.parent : null,
});
const mapDispatchToProps = {parentCategoryHandler};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
