// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CarouselComponent from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import ToastMessage from "../components/ToastMessage";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Gọi API lấy sản phẩm
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 6)))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const showToast = (msg, product = null) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, product }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2000);
  };

  return (
    <div>
      <CarouselComponent />
      <div className="container my-5">
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <ProductCard product={product} showToast={showToast} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Toast hiển thị góc phải */}
      <div style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}>
        {toasts.map((t) => (
          <ToastMessage key={t.id} message={t.msg} product={t.product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
