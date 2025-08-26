import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Empty</p> : null}
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => dispatch(removeFromCart(item.id))}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
