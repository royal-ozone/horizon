import React, {useEffect,useState} from "react";
import {Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useTranslation  } from 'react-i18next';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const Header = (props) => {
  const {cart} = props;
  const { t, i18n } = useTranslation();
  const [style, setStyle] = useState({})
useEffect(() => {
  let x = window.innerWidth
 if(x< 553 ){
   setStyle({display: 'none'})
 }
},[])
const changeLanguage = lang => {
  i18n.changeLanguage(lang);
}
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="">
            <Link to="/">
            <span className='logo'>Horizon</span>
            </Link>
            </Navbar.Brand>
          <Nav>
              <div className="links" style={style}>
              <Nav>

            <Nav.Link href="#features"><img className="fav" src="https://i.top4top.io/p_21828tlph1.png" alt="fav"/></Nav.Link>

            <Nav.Link href="">
            <Link to='/cart'>
              <span className="cartNumber"><strong>{cart.reduce((x,y)=> {return x+y.qty},0)}</strong><img className="fav" src="https://d.top4top.io/p_22088h0ek1.png" alt='cart'/></span>
            </Link>
              </Nav.Link>
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
             
              </Nav>
              </div>
              <NavDropdown title={t('lan')} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" onClick={() => changeLanguage('ar')}>العربية</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" onClick={() => changeLanguage('en')}>
                  English
                </NavDropdown.Item>
              </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart

});

export default connect(mapStateToProps)(Header);
