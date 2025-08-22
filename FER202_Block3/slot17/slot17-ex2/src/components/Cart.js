import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { Button, ListGroup, Alert } from "react-bootstrap";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleCheckout = () => {
    setOrderConfirmed(true);
    clearCart();
  };

  return (
    <div className="my-5">
      <h2 className="mb-3">Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <Alert variant="info">Giỏ hàng của bạn đang trống.</Alert>
      ) : (
        <div>
          <ListGroup className="mb-3">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                {item.name} - ${item.price}
                <Button
                  variant="danger"   // ❌ chỉ nút Remove màu đỏ
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mb-3">
            <p>Tổng số món: {cartItems.length}</p>
            <p>Tổng giá trị: ${totalValue}</p>
          </div>
          <Button variant="primary" className="me-2" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Xác nhận đơn hàng
          </Button>
        </div>
      )}
      {orderConfirmed && (
        <Alert className="mt-3" variant="success">
          Thanh toán thành công! 🎉
        </Alert>
      )}
    </div>
  );
};

export default Cart;
