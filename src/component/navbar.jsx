import React from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl,Button } from "react-bootstrap";

const MainNavbar = () => {
  return (
    <div zIndex='2px'>
    <Navbar bg="light" variant="light">
      <Container>
        <NavDropdown title="Browse Categories" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
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
export default MainNavbar;
