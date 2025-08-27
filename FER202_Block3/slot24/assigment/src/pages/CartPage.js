import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Table, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CartPage = () => {
  const { cartItems, addToCart, removeOne, removeFromCart, clearCart, totalValue } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) navigate("/login");
    else navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container my-4">
        <Alert variant="info">Your cart is empty.</Alert>
        <Button as={Link} to="/products" variant="primary">Go to Products</Button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>Cart</h2>
      <Table striped hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Product</th>
            <th style={{width: 120}}>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th style={{width: 160}}></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td className="d-flex align-items-center gap-3">
                <img src={item.image} alt={item.name} width="60" height="60" />
                <div>{item.name}</div>
              </td>
              <td>{item.qty}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td>${(item.qty * Number(item.price)).toFixed(2)}</td>
              <td>
                <Button size="sm" className="me-2" onClick={() => addToCart(item)}>+</Button>
                <Button size="sm" className="me-2" variant="secondary" onClick={() => removeOne(item.id)}>-</Button>
                <Button size="sm" variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Button as={Link} to="/products" variant="outline-secondary" className="me-2">Tiếp tục mua hàng</Button>
          <Button variant="outline-danger" onClick={clearCart}>Clear Cart</Button>
        </div>
        <div className="fs-5">Total: <strong>${totalValue}</strong></div>
        <div>
          <Button variant="success" onClick={handleCheckout}>Thanh toán</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
