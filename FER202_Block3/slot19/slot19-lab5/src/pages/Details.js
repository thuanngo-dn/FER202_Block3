import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../data/products";
import { Button, Row, Col, Image } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";

const Details = () => {
  const { id } = useParams();
  const product = products.find(p => String(p.id) === id);
  const { addToCart } = useContext(CartContext);
  const { addToFavourites } = useContext(FavouritesContext);
  const navigate = useNavigate();

  if (!product) return <div className="container my-4">Product not found.</div>;

  return (
    <div className="container my-4">
      <Row className="g-4">
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid rounded />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="mb-4">${product.price}</h4>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
            <Button variant="outline-danger" onClick={() => addToFavourites(product)}>Add to Favourite</Button>
            <Button variant="secondary" as={Link} to="/products">Back to List</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
