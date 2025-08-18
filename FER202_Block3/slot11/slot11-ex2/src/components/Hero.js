import React from "react";
import { Carousel } from "react-bootstrap";

function Hero() {
  return React.createElement(
    Carousel,
    { fade: true, interval: 3000 },
    [
      React.createElement(
        Carousel.Item,
        { key: "slide1" },
        [
          React.createElement("img", {
            key: "img1",
            className: "d-block w-100",
            src: "/images/hero/hero1.jpg",   
            alt: "First slide",
            style: { height: "600px", objectFit: "cover" } ,
          }),
          React.createElement(
            Carousel.Caption,
            { key: "caption1" },
            [
              React.createElement("h3", { key: "h1" }, "Student Management"),
              React.createElement("p", { key: "p1" }, "Easily manage student data, filter, and sort.")
            ]
          )
        ]
      ),
      React.createElement(
        Carousel.Item,
        { key: "slide2" },
        [
          React.createElement("img", {
            key: "img2",
            className: "d-block w-100",
            src: "/images/hero/hero2.jpg",
            alt: "Second slide",
            style: { height: "600px", objectFit: "cover" } ,
          }),
          React.createElement(
            Carousel.Caption,
            { key: "caption2" },
            [
              React.createElement("h3", { key: "h2" }, "Filter & Search"),
              React.createElement("p", { key: "p2" }, "Quickly find students by name, email, or age.")
            ]
          )
        ]
      ),
      React.createElement(
        Carousel.Item,
        { key: "slide3" },
        [
          React.createElement("img", {
            key: "img3",
            className: "d-block w-100",
            src: "/images/hero/hero3.jpg",
            alt: "Third slide",
            style: { height: "600px", objectFit: "cover" } ,
          }),
          React.createElement(
            Carousel.Caption,
            { key: "caption3" },
            [
              React.createElement("h3", { key: "h3" }, "Sort & View Details"),
              React.createElement("p", { key: "p3" }, "Organize students by age or name, and view full details.")
            ]
          )
        ]
      )
    ]
  );
}

export default Hero;
