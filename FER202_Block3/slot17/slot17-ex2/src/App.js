import React, { useState } from "react";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import dishes from "./data/data";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <CartProvider>
      <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
        <Container className="py-4">
          <Button
            variant={darkMode ? "light" : "dark"}
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
          <DishesList dishes={dishes} />
          <Cart />
        </Container>
      </div>
    </CartProvider>
  );
}

export default App;
