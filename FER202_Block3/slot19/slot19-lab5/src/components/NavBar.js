import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Badge,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { totalQty } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [dark]);

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className="w-100 py-3"
      style={{ fontSize: "1.3rem" }}
    >
      {/* Dùng div thay Container để full width */}
      <div className="d-flex w-100 justify-content-between align-items-center px-4">
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-2 text-uppercase text-white"
        >
          MyStore 🛍️
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="justify-content-between">
          <Nav className="fw-semibold fs-4">
            <Nav.Link as={Link} to="/" className="text-white px-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="text-white px-3">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="text-white px-3">
              Register Account
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-4 fw-semibold fs-4">
            {/* Nút bật/tắt dark mode */}
            <Button
              size="lg"
              variant={dark ? "light" : "secondary"}
              onClick={() => setDark(!dark)}
              className="rounded-circle"
            >
              {dark ? "🌞" : "🌙"}
            </Button>

            <Nav.Link as={Link} to="/favourites" className="text-white">
              ❤️ <Badge bg="light" text="dark" className="fs-6">{favourites.length}</Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="text-white">
              🛒 <Badge bg="light" text="dark" className="fs-6">{totalQty}</Badge>
            </Nav.Link>

            <NavDropdown
              title={user ? user.name : "Account"}
              align="end"
              menuVariant="light"
              className="fw-semibold fs-5"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/favourites">
                My Favourites
              </NavDropdown.Item>
              {!user && (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              )}
              {user && (
                <NavDropdown.Item
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
