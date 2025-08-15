import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function NavbarComp({ favouritesCount = 0, onFormClick }) {
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="border-bottom">
      <Container>
        <Navbar.Brand className="fw-bold">🎬 Movie Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="me-auto">
            <Nav.Link active>Free Movies</Nav.Link>
            <Nav.Link onClick={onFormClick}>Movie Request Form</Nav.Link>
          </Nav>
          <Button variant="outline-primary" className="rounded-pill">
            Favourites <span className="badge bg-primary ms-1">{favouritesCount}</span>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
