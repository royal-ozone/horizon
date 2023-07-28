import React, { useState, useEffect } from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import mainProduct from "../static-data/mainProduct";
import MainNavbar from "../component/navbar";
import ProfileCard from "../component/productCard";
import ProductView from "../component/featuredDeals"
import featuredDeals from "../static-data/FeaturedAucklandDeals";
import escapes from "../static-data/escapes"
import Automotive from "../static-data/Automotive"
import CarouselItem  from '../component/carousel';

const Main = () => {
  let o = 68;
  const [offset, setOffset] = useState(o);
  let style = {
    position: "fixed",
    top: offset,
    zIndex: 22
  };
  window.addEventListener("scroll", () => {
    if (o - window.pageYOffset > 0) {
      setOffset(o - window.pageYOffset);
    } else {
      setOffset(0);
    }
  });

  return (
    <div>
      <div className="MainNavbar" style={style}>
        <MainNavbar />
      </div>

      <div>
      <CarouselItem/>
      </div>
     
      <div className="container2">
        <div className="discover">
          <h3 className="discoverh">Discover</h3>
          <hr />
          <a href="#">
            <h5 className="discover-h5">Featured Auckland deals</h5>
            <span className="count">191</span>
          </a>
          <a href="#">
            <h5 className="discover-h5">Collections</h5>
            <span className="count">46</span>
          </a>
          <a href="#">
            <h5 className="discover-h5">Escapes</h5>
            <span className="count">69</span>
          </a>
          <a href="#">
            <h5 className="discover-h5">Picked for You</h5>
          </a>
          <a href="#">
            <h5 className="discover-h5">Activities, Events & Outdoors</h5>
            <span className="count">70</span>
          </a>
          <a href="#">
            <h5 className="discover-h5">Store</h5>
            <span className="count">98</span>
          </a>
          <a href="#">
            <h5 className="discover-h5">Restaurants, Bars, Cafes</h5>
            <span className="count">33</span>
          </a>
          <a href="#">
            <h5 className="discover-h5">Beauty, Massage & Spa</h5>
            <span className="count">87</span>
          </a>
          <a href="#">
            <h5 className="discover-h5">House & Garden</h5>
            <span className="count">52</span>
          </a>
          <a href="#">
            <h5 className="discover-h5">Fitness & Sports</h5>
            <span className="count">98</span>
          </a>
          <a href="#">
            <h5 className="discover-h5">Automotive</h5>
            <span className="count">58</span>
          </a>
        </div>
       
       <section className="mainCardSection">
        {mainProduct.map((product) => (
          <ProfileCard product={product} xclass='mainCard' itemType='seller' key ={product.id}/>
          ))}

       </section>
        

        </div>
        <div className="subscribe2">
          <section>
          <h3 className="Hsubscribe2">Get the best deals delivered direct to your inbox each day</h3>
          <div className="subscribeform">
                     <input type="text" placeholder="Enter Your Email" className="email"/>
                      <button className="subscribebtn">Subscribe</button>
                </div>

          </section>
        </div>


      <div className="FD">
      <ProductView title={'Featured Auckland Deals'} product={featuredDeals} xclass='FDP'/>
      <ProductView title={'Escapes'} product={escapes} xclass='FDP'/>
      <ProductView title={'Automotive'} product={Automotive} xclass='FDP'/>
      </div>
    </div>
  );
};

export default Main;
