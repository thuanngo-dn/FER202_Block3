import React from "react";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#333", padding: "10px" }}>
      <ul style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}>
        <li style={{ marginRight: "20px", color: "#fff" }}>Home</li>
        <li style={{ marginRight: "20px", color: "#fff" }}>About</li>
        <li style={{ color: "#fff" }}>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
