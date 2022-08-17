import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, DropdownButton, ButtonGroup, Dropdown, Form, FormControl, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { parentCategoryHandler } from '../store/parent';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
const MainNavbar = ({ parentData }) => {
  const {t, i18n} = useTranslation()
  const { parentCategory, childCategory, grandChildCategory } = parentData
  const [lang,setLang] = useState('')
  const history = useHistory()
  // useEffect(() => {
    
  // }, [i18n.language])

  
  return (
    <div >
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            {parentCategory ? parentCategory.slice(0, 4).map((el) => (

              <NavDropdown id={el.id} title={el[`${i18n.language}title`]} key={el.id}>

                {childCategory.filter(v => v.parent_id === el.id).map((el2) => {

                  return grandChildCategory.filter(v2 => v2.parent_id === el2.id).length > 0 ? grandChildCategory.filter(v2 => v2.parent_id === el2.id).map((el3) => (
                    <NavDropdown id={el2.id} title={el2[`${i18n.language}title`]} key={el2.id}>
                      <Link to={`/products?grandchild_category_id=${el3.id}&child_category_id=${el2.id}&parent_category_id=${el.id}`} key={el3.id} className="nav-link">{el3[`${i18n.language}title`]}</Link>
                      {/* <Nav.Link href={`/products?grandchild_category_id=${el3.id}`} key={el3.id}> {el3.entitle}
                      </Nav.Link> */}

                    </NavDropdown>
                  )) :
                    <Link to={`/products?child_category_id=${el2.id}&parent_category_id=${el.id}`} key={el2.id} className="nav-link">
                      {el2[`${i18n.language}title`]}
                    </Link>
                  // <Nav.Link key={el2.id} href={`/products?child_category_id=${el2.id}`} > {el2.entitle}
                  // </Nav.Link>
                }


                )}

              </NavDropdown>
            )) : null}
            <Nav.Link href='/whats' >What's New</Nav.Link>
            <Nav.Link href="#features" >Trending</Nav.Link>
            <Nav.Link href="#pricing" >For You</Nav.Link>
            <Nav.Link href="#pricing">Shop Products</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={e => { e.preventDefault(); history.push(`/products?key=${e.target.key.value}`) }}>
            <FormControl
              type="search"
              placeholder="Search for products"
              className="me-2"
              aria-label="Search"
              id='key'

            />
            <Button variant="outline-success" type='submit'>Search</Button>
          </Form>
        </Container>
      </Navbar>

    </div>
  );
};
const mapStateToProps = (state) => ({
  parentData: state.parent ? state.parent : null,
});
const mapDispatchToProps = { parentCategoryHandler };

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
