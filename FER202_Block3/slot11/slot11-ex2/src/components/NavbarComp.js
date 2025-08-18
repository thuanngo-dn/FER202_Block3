import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";

function NavbarComp({ onQuickSearch }) {
  const [q, setQ] = useState("");

  const handleChange = (e) => {
    const v = e.target.value;
    setQ(v);
    if (typeof onQuickSearch === "function") onQuickSearch(v);
  };

  return React.createElement(
    Navbar,
    { bg: "dark", variant: "dark", expand: "lg" },
    React.createElement(
      Container,
      null,
      [
        React.createElement(Navbar.Brand, { key: "brand" }, "Student App"),
        React.createElement(Navbar.Toggle, { key: "toggle", "aria-controls": "basic-navbar-nav" }),
        React.createElement(
          Navbar.Collapse,
          { key: "collapse", id: "basic-navbar-nav" },
          [
            React.createElement(
              Nav,
              { key: "links", className: "me-auto" },
              [
                React.createElement(Nav.Link, { key: "home", href: "#home" }, "Home"),
                React.createElement(Nav.Link, { key: "students", href: "#students" }, "Students"),
                React.createElement(Nav.Link, { key: "about", href: "#about" }, "About")
              ]
            ),
            React.createElement(
              Form,
              { key: "form", className: "d-flex" },
              React.createElement(FormControl, {
                type: "search",
                placeholder: "Quick search...",
                className: "me-2",
                value: q,
                onChange: handleChange
              })
            )
          ]
        )
      ]
    )
  );
}

export default NavbarComp;
