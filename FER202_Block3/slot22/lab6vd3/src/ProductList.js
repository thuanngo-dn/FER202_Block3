import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
];

const ProductList = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ${p.price}
          <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
