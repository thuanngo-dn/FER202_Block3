import React, { useContext, useState, useMemo } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import products from "../data/products";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const { addToFavourites, isFavourite } = useContext(FavouritesContext);
  const navigate = useNavigate();

  const [toasts, setToasts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");

  // Hiển thị toast mới
  const showToast = (msg, product = null) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, product }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast("🛒 Added to Cart", product);
  };

  const handleFavouriteClick = (product) => {
    if (!isFavourite(product.id)) {
      addToFavourites(product);
      showToast("Added to Favourites ❤️", product);
    } else {
      navigate("/favourites");
    }
  };

  // Dùng useMemo để tối ưu search + filter + sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search theo tên + mô tả
    if (search.trim()) {
      const kw = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(kw) ||
          p.description.toLowerCase().includes(kw)
      );
    }

    // Filter theo giá
    if (filterPrice !== "all") {
      if (filterPrice === "low") list = list.filter((p) => p.price < 500);
      if (filterPrice === "mid")
        list = list.filter((p) => p.price >= 500 && p.price <= 1000);
      if (filterPrice === "high") list = list.filter((p) => p.price > 1000);
    }

    // Sort
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [search, sort, filterPrice]);

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">All Products</h2>

      {/* Search + Filter + Sort Controls */}
      <Row className="mb-4">
        <Col md={4} className="mb-2">
          <Form.Control
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={4} className="mb-2">
          <Form.Select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="low">Below $500</option>
            <option value="mid">$500 - $1000</option>
            <option value="high">Above $1000</option>
          </Form.Select>
        </Col>

        <Col md={4} className="mb-2">
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted" style={{ flex: 1 }}>
                    {product.description.substring(0, 70)}...
                  </Card.Text>
                  <h6 className="mb-3 text-primary">${product.price}</h6>
                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant={
                        isFavourite(product.id) ? "danger" : "outline-danger"
                      }
                      size="sm"
                      onClick={() => handleFavouriteClick(product)}
                    >
                      {isFavourite(product.id)
                        ? "In Favourites"
                        : "❤️ Favourite"}
                    </Button>
                    <Button
                      as={Link}
                      to={`/details/${product.id}`}
                      variant="secondary"
                      size="sm"
                    >
                      Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No products found.</p>
        )}
      </Row>

      {/* Render tất cả toast ở góc trên phải */}
      <div style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}>
        {toasts.map((t) => (
          <ToastMessage key={t.id} message={t.msg} product={t.product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
