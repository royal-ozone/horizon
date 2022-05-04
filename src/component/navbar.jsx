import React , { useState, useEffect }from "react";
import { Navbar, Container, Nav, NavDropdown,DropdownButton,ButtonGroup,Dropdown, Form, FormControl,Button } from "react-bootstrap";
import {connect} from 'react-redux';
import {parentCategoryHandler} from '../store/product';
const MainNavbar = (props) => {
  const {parentCategoryHandler,parentData} = props;
  const [parent,setParent] =useState([]);
  const [child,setChild] =useState([]);
  const [grandChild,setGrandChild] =useState([]);
  const [product,setProduct] =useState([]);
  
  
  useEffect(() => {
    parentCategoryHandler();
    console.log("🚀 ~ file: navbar.jsx ~ line 7 ~ MainNavbar ~ parentData", parentData)
    setParent(parentData.parentCategory);
    setChild(parentData.childCategory);
    setGrandChild(parentData.grandChildCategory);
    
  },[]);
  
  console.log("🚀 ~ file: navbar.jsx ~ line 9 ~ MainNavbar ~ parent", parent)
  console.log("🚀 ~ file: navbar.jsx ~ line 11 ~ MainNavbar ~ child", child)
  console.log("🚀 ~ file: navbar.jsx ~ line 13 ~ MainNavbar ~ grandChild", grandChild)
  
  return (
    <div zIndex='2px'>
    <Navbar bg="light" variant="light">
      <Container>
        {/* <NavDropdown title="Browse Categories" id="collasible-nav-dropdown">
         <NavDropdown  title="Woman"> 
          <NavDropdown.Item >Action
         
          </NavDropdown.Item>
         </NavDropdown>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
        <DropdownButton 
        as={ButtonGroup}
        id={`dropdown-button-drop-end`}
        drop='end'
        variant="secondary"
        title='ALL'
        >
            <Dropdown eventKey="1">
{              console.log("🚀 ~ file: navbar.jsx ~ line 48 ~ MainNavbar ~ parent", parent)
}              {parent.status===200?parent.response.map((el)=>(
                 <NavDropdown title={el.entitle} id="collasible-nav-dropdown">
{                 console.log("🚀 ~ file: navbar.jsx ~ line 51 ~ MainNavbar ~ el.entitle", el.entitle)
}                 <NavDropdown title="clothes" id="collasible-nav-dropdown">
                     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                 </NavDropdown>
                 <NavDropdown title="shoes" id="collasible-nav-dropdown">
                     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                 </NavDropdown>
               </NavDropdown>
              )):null}
                {/* <NavDropdown title="Man" id="collasible-nav-dropdown">
                  <NavDropdown title="clothes" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="shoes" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  </NavDropdown>
                </NavDropdown>
                <NavDropdown  title="Woman" id="collasible-nav-dropdown">
                  <NavDropdown title="clothes" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="shoes" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  </NavDropdown>
                </NavDropdown>
                <NavDropdown title="Kids" id="collasible-nav-dropdown">
                </NavDropdown> */}
        
            </Dropdown>
         
        </DropdownButton>
        <Nav className="me-auto">
          <Nav.Link href="#home">What's New</Nav.Link>
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
