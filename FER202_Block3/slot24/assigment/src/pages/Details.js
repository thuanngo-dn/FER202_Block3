// src/pages/Details.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Image, Badge } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import ToastMessage from "../components/ToastMessage";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isWished } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(undefined); // undefined = chưa fetch, null = not found
  const [toast, setToast] = useState({ show: false, message: "", product: null });

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.id) setProduct(data);
        else setProduct(null);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setProduct(null);
      });
  }, [id]);

  // trạng thái loading
  if (product === undefined) {
    return <div className="container my-4">⏳ Loading...</div>;
  }

  // nếu không tìm thấy
  if (product === null) {
    return <div className="container my-4">❌ Product not found.</div>;
  }

  const showToast = (message) => {
    setToast({ show: true, message, product });
    setTimeout(() => setToast({ show: false, message: "", product: null }), 2000);
  };

  // ✅ Kiểm tra login trước khi thực hiện action
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product);
    showToast("Added to Cart!");
  };

  const handleAddToWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToWishlist(product);
    showToast(isWished(product.id) ? "Removed from Wishlist" : "Added to Wishlist");
  };

  return (
    <div className="container my-5">
      <Row className="g-4">
        <Col md={6} className="text-center">
          <Image
          // nếu đường dẫn ảnh thêm thư mục thì dùng /
            src={product.image.startsWith("/") ? product.image : "/" + product.image}
            //ko có thêm foder phone thì dùng dòng dưới
           // src={product.image} alt={product.title}
            fluid
            rounded
            style={{ maxHeight: "400px", objectFit: "contain" }}
            
          />
          
          <div className="mt-3">
            {product.tags?.includes("hot") && <Badge bg="danger" className="me-2">HOT</Badge>}
            {product.tags?.includes("sale") && <Badge bg="success">SALE</Badge>}
          </div>
        </Col>

        <Col md={6}>
          <h2 className="fw-bold">{product.title}</h2>
          <p className="text-muted">{product.description}</p>

          <h4 className="mb-4">
            {product.tags?.includes("sale") && product.salePrice ? (
              <>
                <span className="text-decoration-line-through text-muted me-2">
                  ${product.price}
                </span>
                <span className="text-danger fw-bold">${product.salePrice}</span>
              </>
            ) : (
              <span className="fw-bold text-primary">${product.price}</span>
            )}
          </h4>

          <div className="d-flex gap-3">
            <Button variant="primary" onClick={handleAddToCart}>
              🛒 Add to Cart
            </Button>

            <Button
              variant={isWished(product.id) ? "danger" : "outline-danger"}
              onClick={handleAddToWishlist}
            >
              {isWished(product.id) ? "❤️ In Wishlist" : "❤️ Add to Wishlist"}
            </Button>

            <Button variant="secondary" as={Link} to={user ? "/products" : "/"}>
              🔙 Back
            </Button>
          </div>
        </Col>
      </Row>

      {/* Toast hiển thị */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        {toast.show && <ToastMessage message={toast.message} product={toast.product} />}
      </div>
    </div>
  );
};

export default Details;
