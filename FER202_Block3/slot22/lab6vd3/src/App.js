import React from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

const App = () => {
  return (
    <div>
      <h1>Redux Cart Example</h1>
      <ProductList />
      <Cart />
    </div>
  );
};

export default App;
