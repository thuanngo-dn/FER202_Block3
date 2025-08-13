import React, { useEffect } from "react";

function PromiseExample() {
  useEffect(() => {
    const randomNumberPromise = new Promise((resolve, reject) => {
      const num = Math.floor(Math.random() * 10) + 1;
      if (num > 5) {
        resolve(num);
      } else {
        reject("Error");
      }
    });

    randomNumberPromise
      .then(num => console.log("Number:", num))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Promise Example</h2>
      <p>Open console to see the result.</p>
    </div>
  );
}

export default PromiseExample;
