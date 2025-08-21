import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleCheckout = () => {
    setOrderConfirmed(true);
    clearCart();
  };

  return (
    <div>
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <p>{`Tổng số món: ${cartItems.length}`}</p>
            <p>{`Tổng giá trị: $${totalValue}`}</p>
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={handleCheckout}>Xác nhận đơn hàng</button>
          </div>
        </div>
      )}
      {orderConfirmed && (
        <p className="success-message">Thanh toán thành công! 🎉</p>
      )}
    </div>
  );
};

export default Cart;
