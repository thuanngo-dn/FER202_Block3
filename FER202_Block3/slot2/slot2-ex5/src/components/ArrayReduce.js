import React from "react";

function ArrayReduce() {
  const array = [1, 2, 3, 4];

  const sum = array.reduce((acc, val) => acc + val, 0);
  const product = array.reduce((acc, val) => acc * val, 1);

  return (
    <div>
      <h2>Array Reduce</h2>
      <p>Sum: {sum}</p>
      <p>Product: {product}</p>
    </div>
  );
}

export default ArrayReduce;
