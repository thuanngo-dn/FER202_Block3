import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const [search, setSearch] = useState("");

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="my-4">
      <h2 className="mb-3 text-center">Danh sách món ăn</h2>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm món ăn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredDishes.map((dish) => (
          <Col key={dish.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={dish.image} alt={dish.name} />
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>{dish.description}</Card.Text>
                <Card.Text className="fw-bold">
                  Price: ${parseFloat(dish.price).toFixed(2)}
                </Card.Text>
                <Button variant="primary" onClick={() => addToCart(dish)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;
