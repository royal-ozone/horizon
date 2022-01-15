import React, {useEffect,useState} from "react";
import {Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  const [style, setStyle] = useState({})
useEffect(() => {
  let x = window.innerWidth
 if(x< 553 ){
   setStyle({display: 'none'})
 }
},[])
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><span className='logo'>Horizon</span></Navbar.Brand>
          <Nav>
              <img
                className="pin"
                src="https://j.top4top.io/p_21814opub1.png"
                alt="pin"
              />
              <NavDropdown title="Auckland" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <div className="links" style={style}>
              <Nav>

            <Nav.Link href="#features"><img className="fav" src="https://i.top4top.io/p_21828tlph1.png" alt="fav"/></Nav.Link>
            <Nav.Link href="#pricing"><img className="fav" src="https://k.top4top.io/p_2182zfpu31.png" alt='cart'/></Nav.Link>
          <img
                className="profile"
                src="https://b.top4top.io/p_2182nn0jy1.png"
                alt="pin"
              />
              <NavDropdown  title="" id="collasible-nav-dropdown2"  >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#features">
                <img className="subscribe" src="https://j.top4top.io/p_21826qy0f2.png" alt='subscribe'/>
                Subscribe
              </Nav.Link>
              </Nav>
              </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
