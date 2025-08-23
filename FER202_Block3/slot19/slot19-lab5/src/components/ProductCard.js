import React, { useContext } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContext";

const ProductCard = ({ product }) => {
  const { addToFavourites, isFavourite } = useContext(FavouritesContext);

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: "220px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="mb-0">{product.name}</Card.Title>
          {product.tag && (
            <Badge bg="success" pill>
              {product.tag}
            </Badge>
          )}
        </div>
        <Card.Text className="text-muted flex-grow-1">
          {product.description}
        </Card.Text>

      
        {!isFavourite(product.id) ? (
          <Button
            variant="primary"
            className="w-100 mb-2"
            onClick={() => addToFavourites(product)}
          >
            Add to Favourites
          </Button>
        ) : (
          <Button as={Link} to="/favourites" variant="secondary" className="w-100 mb-2">
            In Favourites
          </Button>
        )}
        <Button as={Link} to={`/details/${product.id}`} variant="dark" className="w-100">
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
