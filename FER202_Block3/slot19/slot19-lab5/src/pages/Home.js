import React, { useContext, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import CarouselComponent from "../components/Carousel";
import products from "../data/products";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const { addToFavourites, isFavourite } = useContext(FavouritesContext);
  const navigate = useNavigate();

  const [toasts, setToasts] = useState([]);

  // Hiển thị toast mới
  const showToast = (msg, product = null) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, product }]);

    // Xóa toast sau 2s
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

  return (
    <div>
      <CarouselComponent />

      <div className="container my-5">
        <h2 className="mb-4 fw-bold">Featured Products</h2>
        <Row>
          {products.slice(0, 6).map((product) => (
            <Col key={product.id} md={4} className="mb-4">
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
                    {product.description.substring(0, 80)}...
                  </Card.Text>
                  <h5 className="mb-3 text-primary">${product.price}</h5>
                  <div className="d-flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                    <Button
                      variant={isFavourite(product.id) ? "danger" : "outline-danger"}
                      size="sm"
                      onClick={() => handleFavouriteClick(product)}
                    >
                      {isFavourite(product.id) ? "In Favourites" : "❤️ Favourite"}
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
          ))}
        </Row>
      </div>

      {/* Render tất cả toast ở góc trên phải */}
      <div style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}>
        {toasts.map((t) => (
          <ToastMessage key={t.id} message={t.msg} product={t.product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
