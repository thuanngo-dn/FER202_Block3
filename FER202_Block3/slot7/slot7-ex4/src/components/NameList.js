import React from "react";

const NameList = ({ names }) => {
  return (
    <>
      <h3>Hello</h3>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  );
};

export default NameList;
