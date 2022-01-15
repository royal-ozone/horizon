import React from "react";
// import { Carousel } from 'react-responsive-carousel';
import { Carousel } from "react-bootstrap";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/1111.jpg";

const CarouselItem = () => {
  const CarouselItems = [
    {
      img: "https://www.efficy.com/wp-content/uploads/2019/03/crm-for-e-commerce-900x412.jpg",
      description: "shop from diffetent categoreis in one cart",
    },
    {
      img: "https://takebacklink.com/wp-content/uploads/2021/10/eCommerce.jpg",
      description: "get your order in 72 Hours",
    },
    {
      img: "https://cdn.techinasia.com/wp-content/uploads/2016/03/packing-box-seller-ecommerce.jpeg",
      description:
        "Sellers can sell with us and increase their customers target segment",
    },
  ];

  return (
    <div className="carousel">
      <Carousel>
          {CarouselItems.map((item,idx)=>
        <Carousel.Item key={idx}>
          <img src={item.img} />
            <h1>{item.description}</h1>
          <Carousel.Caption>
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>

          )}
        {/* <p className="legend">Legend 1</p>
        <Carousel.Item>
          <img src="https://takebacklink.com/wp-content/uploads/2021/10/eCommerce.jpg" />
        </Carousel.Item>
        <p className="legend">Legend 2</p>
        <Carousel.Item>
          <img src="https://cdn.techinasia.com/wp-content/uploads/2016/03/packing-box-seller-ecommerce.jpeg" />
        </Carousel.Item>

        <p className="legend">Legend 3</p> */}
      </Carousel>
    </div>
  );
};

export default CarouselItem;
