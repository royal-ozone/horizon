import React, { useEffect, useState } from "react";
import cookie from 'react-cookies';
import {logOutHandler} from '../store/sign';
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
let signInToken =cookie.load('tokenSignIn')
console.log("🚀 ~ file: header.jsx ~ line 9 ~ signInToken", signInToken)
const Header = (props) => {
  const history = useHistory();
console.log("🚀 ~ file: header.jsx ~ line 12 ~ Header ~ props", props)
  const { cart } = props;
  const { t, i18n } = useTranslation();
  const [style, setStyle] = useState({});
  
  useEffect(() => {
    let x = window.innerWidth
    if (x < 553) {
      setStyle({ display: 'none' })
    }
  }, [])
  const changeLanguage = lang => {
    if(lang === 'en') {
      i18n.changeLanguage(lang);
      document.documentElement.setAttribute("lang", 'en');
      document.documentElement.setAttribute("dir", 'ltl');
    }  else {
      i18n.changeLanguage(lang);
      document.documentElement.setAttribute("lang", 'ar');
      document.documentElement.setAttribute("dir", 'rtl');
    }
  }
  const logOutHandle = () => {
      props.logOutHandler();
      history.push('/signIn')
      
    //  window.location ='http://localhost:3000/'
    console.log("🚀 ~ file: header.jsx ~ line 35 ~ logOutHandle ~ props", props)
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
                <Nav.Link href="">
                  <Link to="/wishlist">
                    <img className="fav" src="https://i.top4top.io/p_21828tlph1.png" alt="fav" />
                  </Link>
                </Nav.Link>
                <div className="nav-link">
                  <img className='fav' src="https://c.top4top.io/p_2211sjs931.png" alt="notificaiton" />
                    <strong className="notificaitonCount">1</strong>                    
                </div>
                <Nav.Link href="">
                  <Link to='/cart'>
                    <span className="cartNumber"><strong>{cart.reduce((x, y) => { return x + y.qty }, 0)}</strong><img className="fav" src="https://d.top4top.io/p_22088h0ek1.png" alt='cart' /></span>
                  </Link>
                </Nav.Link>
          <img
                className="profile"
                src="https://b.top4top.io/p_2182nn0jy1.png"
                alt="pin"
              />
              <NavDropdown  title="" id="collasible-nav-dropdown2"  >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2"> Another action </NavDropdown.Item>
                {props.userSignIn.access_token?
                  <NavDropdown.Item   onClick={logOutHandle}>
                  Log Out 
                </NavDropdown.Item>
              :
              <div>

                <NavDropdown.Item href="/signUp">
                  Sign Up 
                </NavDropdown.Item>
                <NavDropdown.Item href="/verification">
                 verification
                </NavDropdown.Item>
                <NavDropdown.Item href="/signIn">
                  Sign In
                </NavDropdown.Item>
              </div>
             
             
             
            }
            <NavDropdown.Item href="/settings">settings</NavDropdown.Item>
                <NavDropdown.Divider />
                
                
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
  cart: state.cart,
  dataLogOut: state.log,
  userSignIn: state.sign ? state.sign : null
});
const mapDispatchToProps = { logOutHandler};
export default connect(mapStateToProps,mapDispatchToProps)(Header);
