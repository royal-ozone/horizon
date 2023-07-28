import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import { logOutHandler } from "../store/auth";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Fav from "../assets/fav.PNG";
import Cart from "../assets/cart.PNG";
import { CButton, CListGroup, CListGroupItem } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilList, cilShieldAlt, cilBell } from "@coreui/icons";

const Header = (props) => {
  const login = useSelector((state) => state.sign.login);
  const history = useHistory();
  const { cart, userSignIn } = props;
  // const [login, setLogin] = useState(false);
  const [displayList, setDisplayList] = useState(false)
  const { t, i18n } = useTranslation();
  const [style, setStyle] = useState({});

  useEffect(() => {
    let x = window.innerWidth;
    if (x < 553) {
      setStyle({ display: "none" });
    }
  }, []);

  // useEffect(() => {
  //   if (cookie.load('access_token')) {
  //     setLogin(true);
  //     console.log("🚀 ~ file: header.jsx ~ line 39 ~ Header ~ login", login)
  //   }
  //   else {
  //     setLogin(false);
  //   }
  // }, [userSignIn, login])

  const changeLanguage = (lang) => {
    if (lang === "en") {
      i18n.changeLanguage(lang);
      document.documentElement.setAttribute("lang", "en");
      document.documentElement.setAttribute("dir", "ltl");
    } else {
      i18n.changeLanguage(lang);
      document.documentElement.setAttribute("lang", "ar");
      document.documentElement.setAttribute("dir", "rtl");
    }
  };
  const logOutHandle = () => {
    props.logOutHandler();
    // setLogin(false)
    history.push("/");
  };
  document.addEventListener('click', e => {
    if(!displayList){
      return
    }
    document.activeElement.tagName.toLowerCase()  === 'body' && !e.target?.classList?.value.includes('icon') && setDisplayList(false)
  	
  })


  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="nav-link">
              <span className="logo">Horizon</span>
            </Link>
          </Navbar.Brand>
          <Nav>
            <div className="links" style={style}>
              <Nav>
                <Link to="/wishlist" className="nav-link" key="wishlist">
                  <img className="fav" src={Fav} alt="fav" />
                </Link>
                <div className="nav-link notifications" key="notification"  >
                  {/* <img className='fav' src="https://c.top4top.io/p_2211sjs931.png" alt="notificaiton" /> */}
                  <CIcon icon={cilBell} size="xxl" onClick={()=> setDisplayList(x=> !x)} className='pointer'/>
                  {/* <CButton >
                  </CButton> */}
                  <strong className="notificaitonCount">1</strong>
                  <div className={`notification-list ${displayList? 'show': 'hide'}`}>
                    <CListGroup>
                      <CListGroupItem component="a" href="#" >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">List group item heading</h5>
                          <small>3 days ago</small>
                        </div>
                        <p className="mb-1">
                          Donec id elit non mi porta gravida at eget metus.
                          Maecenas sed diam eget risus varius blandit.
                        </p>
                        <small>Donec id elit non mi porta.</small>
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">List group item heading</h5>
                          <small className="text-medium-emphasis">
                            3 days ago
                          </small>
                        </div>
                        <p className="mb-1">
                          Donec id elit non mi porta gravida at eget metus.
                          Maecenas sed diam eget risus varius blandit.
                        </p>
                        <small className="text-medium-emphasis">
                          Donec id elit non mi porta.
                        </small>
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">List group item heading</h5>
                          <small className="text-medium-emphasis">
                            3 days ago
                          </small>
                        </div>
                        <p className="mb-1">
                          Donec id elit non mi porta gravida at eget metus.
                          Maecenas sed diam eget risus varius blandit.
                        </p>
                        <small className="text-medium-emphasis">
                          Donec id elit non mi porta.
                        </small>
                      </CListGroupItem>
                    </CListGroup>
                  </div>
                </div>
                <Link to="/cart" className="nav-link" key="cart">
                  <span className="cartNumber">
                    <strong>
                      {cart.reduce((x, y) => {
                        return x + y.quantity;
                      }, 0)}
                    </strong>
                    <img className="fav" src={Cart} alt="cart" />
                  </span>
                </Link>

                <img
                  className="profile"
                  src="https://b.top4top.io/p_2182nn0jy1.png"
                  alt="pin"
                />
                <NavDropdown id="collasible-nav-dropdown2">
                  {login ? (
                    <>
                      <Link to="/settings" className="dropdown-item">
                        settings
                      </Link>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logOutHandle}>
                        Log Out
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <Link to="/signUp" className="dropdown-item">
                        Sign Up
                      </Link>
                      <Link className="dropdown-item" to="/verification">
                        verification
                      </Link>
                      <Link className="dropdown-item" to="/signin">
                        Sign In
                      </Link>
                    </>
                  )}
                </NavDropdown>
              </Nav>
            </div>
            <NavDropdown title={t("lan")} id="collasible-nav-dropdown">
              <NavDropdown.Item
                href="#action/3.1"
                onClick={() => changeLanguage("ar")}
              >
                العربية
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onClick={() => changeLanguage("en")}
              >
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
  userSignIn: state.sign ? state.sign : null,
});
const mapDispatchToProps = { logOutHandler };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
