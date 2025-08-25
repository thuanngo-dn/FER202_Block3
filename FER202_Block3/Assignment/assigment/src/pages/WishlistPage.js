import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Button, Card, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useContext(WishlistContext);

  if (!wishlistItems.length) {
    return (
      <div className="container py-4">
        <Alert variant="info">Chưa có sản phẩm yêu thích nào.</Alert>
        <Button as={Link} to="/" variant="primary">Về trang chủ</Button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Wishlist ({wishlistItems.length})</h4>
        <Button variant="outline-danger" onClick={clearWishlist}>❌ Xoá tất cả</Button>
      </div>
      <Row xs={1} md={2} lg={3} className="g-3">
        {wishlistItems.map((p) => (
          <Col key={p.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img src={p.image} alt={p.title} style={{ height: 200, objectFit: "cover" }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-1">{p.title}</Card.Title>
                <div className="text-muted mb-2">{p.name}</div>
                <div className="fw-semibold mb-3">
                  {p.salePrice ? (
                    <>
                      <span className="text-decoration-line-through me-2">${p.price}</span>
                      <span className="text-danger fw-bold">${p.salePrice}</span>
                    </>
                  ) : (
                    <span className="fw-bold text-primary">${p.price}</span>
                  )}
                </div>
                <div className="mt-auto d-flex gap-2">
                  {/* ✅ sửa lại đúng route */}
                  <Button as={Link} to={`/details/${p.id}`} variant="dark" className="flex-grow-1">
                    Xem chi tiết
                  </Button>
                  <Button variant="outline-danger" onClick={() => removeFromWishlist(p.id)}>
                    Bỏ thích
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WishlistPage;
