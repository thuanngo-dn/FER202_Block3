import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselComponent = () => {
  return (
    <Carousel interval={3000} pause="hover">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner1.jpg"
          alt="First slide"
          style={{
            height: "420px",
            objectFit: "cover"
          }}
        />
        <Carousel.Caption>
          <h3>Special Promotion</h3>
          <p>New technology products 2024</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner2.jpg"
          alt="Second slide"
          style={{
            height: "420px",
            objectFit: "cover"
          }}
        />
        <Carousel.Caption>
          <h3>Shop Today</h3>
          <p>Student discounts available</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner3.jpg"
          alt="Third slide"
          style={{
            height: "420px",
            objectFit: "cover"
          }}
        />
        <Carousel.Caption>
          <h3>Hot Products</h3>
          <p>Best-selling this month</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
