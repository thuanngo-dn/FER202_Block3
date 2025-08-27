// src/pages/Products.js
import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import ToastMessage from "../components/ToastMessage";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [toasts, setToasts] = useState([]);

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const showToast = (msg, product = null) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, product }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2000);
  };

  // Lọc và sắp xếp
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "title-asc") return a.name.localeCompare(b.name);   // ✅ A → Z
      if (sort === "title-desc") return b.name.localeCompare(a.name); // ✅ Z → A
      return 0;
    });

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">All Products</h2>

      {/* Search + Sort */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="title-asc">Name: A → Z</option>     
            <option value="title-desc">Name: Z → A</option>  
          </Form.Select>
        </Col>
      </Row>

      {/* Danh sách sản phẩm */}
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <ProductCard product={product} showToast={showToast} />
          </Col>
        ))}
      </Row>

      {/* Toast hiển thị góc phải */}
      <div style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}>
        {toasts.map((t) => (
          <ToastMessage key={t.id} message={t.msg} product={t.product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
