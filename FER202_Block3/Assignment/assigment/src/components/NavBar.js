// src/components/NavBar.js
import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  // ✅ Thay đổi theme toàn trang
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: darkMode ? "#000000" : "#0077b6", 
        transition: "background-color 0.3s ease", 
      }}
      variant="dark" // chữ luôn trắng 
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          🛒 MyShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {/* Menu trái */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user && <Nav.Link as={Link} to="/products">Products</Nav.Link>}
            {user && <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>}
            {user && <Nav.Link as={Link} to="/cart">Cart</Nav.Link>}
            {user && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
          </Nav>

          {/* Menu phải */}
          <Nav className="align-items-center">
            {/* ✅ Dark mode toggle */}
            <Form.Check
              type="switch"
              id="darkmode-switch"
              label={darkMode ? "🌙 Dark" : "☀️ Light"}
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="me-3"
            />

            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              <Button
                variant="outline-light"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
