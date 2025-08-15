import React from "react";
import Carousel from "react-bootstrap/Carousel";

const slides = [
  {
    src: "/images/hero1.jpg",
    title: "Explore Blockbusters",
    text: "Hand-picked highlights across genres."
  },
  {
    src: "/images/hero2.jpg",
    title: "Search. Filter. Enjoy.",
    text: "Find movies that fit your mood."
  },
  {
    src: "/images/hero3.jpg",
    title: "Save Favourites",
    text: "Your list lives in your browser."
  }
];

export default function Hero() {
  return (
    <div className="hero-wrap rounded overflow-hidden shadow-sm" style={{ maxWidth: "100%", margin: "0 auto" }}>
      <Carousel variant="dark" interval={3000} fade>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <div
              style={{
                width: "100%",
                height: "500px", // Chiều cao cố định
                objectFit: "cover",
              }}
            >
              <img
                className="d-block w-100"
                src={slide.src}
                alt={slide.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Giữ tỷ lệ, cắt phần thừa
                  objectPosition: "center"
                }}
              />
            </div>
            <Carousel.Caption
              className="bg-light bg-opacity-75 rounded px-3 py-2 text-dark"
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              <h5 className="fw-bold">{slide.title}</h5>
              <p className="mb-0">{slide.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
