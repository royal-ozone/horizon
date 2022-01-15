import React from "react";
import {
  Container,
  Col,
  Row,
  Navbar,
  Button,
} from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Row>
          <Col md={3}>
            <Row>
              <strong>Follow us on</strong>
            </Row>
            <div className="SMI">
              <a className="SMA" href="#">
                <img
                  className="SM"
                  src="https://k.top4top.io/p_2182qpap21.png"
                  alt=""
                />
              </a>
              <a className="SMA" href="#">
                <img
                  className="SM"
                  src="https://l.top4top.io/p_2182266x22.png"
                  alt=""
                />
              </a>
              <a className="SMA" href="#">
                <img
                  className="SM"
                  src="https://c.top4top.io/p_2182ap33n3.png"
                  alt=""
                />
              </a>
              <a className="SMA" href="#">
                <img
                  className="SM"
                  src="https://e.top4top.io/p_2182knb9w4.png"
                  alt=""
                />
              </a>
            </div>
            <Row>
              <strong className="STA">Get app exclusive deals</strong>
            </Row>
            <Row xs={1} md={1}>
              <Col>
                <Button variant="primary" size="lg">
                  <img
                    className="app"
                    src="https://horizon-uploader.s3.us-east-2.amazonaws.com/phone.PNG"
                    alt="app"
                  />
                  Download Our App
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={4} md={2}>
            <strong>GrabOne</strong>
            <div className="footlinks">
              <a href="#">Contact Us</a>
              <a href="#">About Us</a>
              <a href="#">Terms & Returns</a>
              <a href="#">Blog</a>
              <a href="#">Gift Cards</a>
            </div>
          </Col>
          <Col xs={4} md={2}>
            <strong>My Account</strong>
            <div className="footlinks">
              <a href="#">My Account</a>
              <a href="#">My Cart</a>
              <a href="#">My Coupons</a>
              <a href="#">FAQ</a>
            </div>
          </Col>
          <Col xs={4} md={2}>
            <strong>Merchants</strong>
            <div className="footlinks">
              <a href="#">Run a Deal</a>
              <a href="#">Merchant Centre</a>
            </div>
          </Col>
          <Col>
            <strong className="news">Newsletter Signup</strong>
            <p className="news">
              Sign up for our daily emails and we'll send you all the best
              deals, tailored for you.
            </p>
                <div className="subscribeform">
                     <input type="text" placeholder="Enter Your Email" className="email"/>
                      <button className="subscribebtn">Subscribe</button>
                </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Footer;
