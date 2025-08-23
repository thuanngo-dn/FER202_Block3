import React, { useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FavouritesContext } from "../context/FavouritesContext";
import { Link } from "react-router-dom";

const Favourites = () => {
  const { favourites, removeFromFavourites, clearFavourites } =
    useContext(FavouritesContext);

  if (favourites.length === 0) {
    return (
      <div className="container my-5">
        <h2 className="mb-4 fw-bold">My Favourites</h2>
        <p>No favourite products yet.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Favourites</h2>
        <Button variant="danger" size="sm" onClick={clearFavourites}>
          ❌ Clear All
        </Button>
      </div>

      <Row>
        {favourites.map((product) => (
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
                <div className="d-flex gap-2 mt-auto">
                  <Button
                    as={Link}
                    to={`/details/${product.id}`}
                    variant="secondary"
                    size="sm"
                  >
                    Details
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromFavourites(product.id)}
                  >
                    Remove
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

export default Favourites;
