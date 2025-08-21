import React from "react";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import dishes from "./data/data"; // 👉 import dữ liệu từ file riêng
import "./styles.css";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <DishesList dishes={dishes} />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
