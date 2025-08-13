import React from "react";
import { Navbar, Nav, Container, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function NavbarComp({ favouritesCount, onFormClick }) {
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
            <Nav.Link  role="button"
             onClick={onFormClick}
             style={{ cursor: "pointer" }}
>
  Recipe Request Form
            </Nav.Link>
          </Nav>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Your favourite recipes</Tooltip>}
          >
            <Button variant={favouritesCount > 0 ? "danger" : "outline-danger"}>
              ❤️ Favourites{" "}
              <Badge bg={favouritesCount > 0 ? "light" : "danger"} text={favouritesCount > 0 ? "dark" : undefined}>
                {favouritesCount}
              </Badge>
            </Button>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
