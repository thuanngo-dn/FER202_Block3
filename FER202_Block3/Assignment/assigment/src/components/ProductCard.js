// src/components/ProductCard.js
import React, { useContext } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product, showToast }) => {
  const { addToWishlist, isWished } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Kiểm tra login trước khi Add to Cart
  const handleAddToCart = () => {
    if (!user) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect_uri=${redirect}`);
      return;
    }
    addToCart(product);
    showToast?.("🛒 Added to Cart", product);
  };

  // ✅ Wishlist
  const handleWishlistClick = () => {
    if (!user) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect_uri=${redirect}`);
      return;
    }
    if (!isWished(product.id)) {
      addToWishlist(product);
      showToast?.("❤️ Added to Wishlist", product);
    } else {
      navigate("/wishlist");
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <div className="position-relative">
        {product.tags?.includes("hot") && (
          <Badge bg="danger" className="position-absolute m-2" style={{ top: 0, left: 0 }}>
            HOT
          </Badge>
        )}
        {product.tags?.includes("sale") && (
          <Badge bg="success" className="position-absolute m-2" style={{ top: 0, right: 0 }}>
            SALE
          </Badge>
        )}
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: "220px", objectFit: "cover" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="text-muted" style={{ flex: 1 }}>
          {product.description?.substring(0, 80)}...
        </Card.Text>
        <h5 className="mb-3">
          {product.tags?.includes("sale") && product.salePrice ? (
            <>
              <span className="text-decoration-line-through text-muted me-2">${product.price}</span>
              <span className="text-danger fw-bold">${product.salePrice}</span>
            </>
          ) : (
            <span className="fw-bold text-primary">${product.price}</span>
          )}
        </h5>
        <div className="d-flex gap-2">
          <Button variant="primary" size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button
            variant={isWished(product.id) ? "danger" : "outline-danger"}
            size="sm"
            onClick={handleWishlistClick}
          >
            {isWished(product.id) ? "In Wishlist" : "❤️ Wishlist"}
          </Button>
          <Button as={Link} to={`/details/${product.id}`} variant="secondary" size="sm">
            Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
