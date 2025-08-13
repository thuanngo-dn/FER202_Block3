import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function NavbarComp() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">🍽 MyRecipes</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Recipes</Nav.Link>
          </Nav>
          <Button variant="success">Browse Recipes</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
