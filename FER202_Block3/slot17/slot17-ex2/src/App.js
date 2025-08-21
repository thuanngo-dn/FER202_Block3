import React, { useState } from "react";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import dishes from "./data/data"; // 👉 import dữ liệu từ file riêng
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <CartProvider>
      <div className={darkMode ? "App dark" : "App"}>
        <button onClick={() => setDarkMode(!darkMode)} className="dark-btn">
          {darkMode ? "Light Mode" : " Dark Mode"}
        </button>
        <DishesList dishes={dishes} />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
