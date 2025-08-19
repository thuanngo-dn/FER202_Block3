import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import ProfileWizard from "./ProfileWizard";
import ProfilePreview from "./ProfilePreview";

function NavbarComp() {
  const [showWizard, setShowWizard] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [profile, setProfile] = useState(null);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Student Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Students</Nav.Link>
            </Nav>
            <div className="d-flex gap-2">
              <Button variant="outline-info" onClick={() => setShowWizard(true)}>
                Build Your Profile
              </Button>
              {profile && (
                <Button variant="outline-light" onClick={() => setShowPreview(true)}>
                  Profile
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Wizard */}
      <ProfileWizard
        show={showWizard}
        onHide={() => setShowWizard(false)}
        onFinish={(newProfile) => {
          setProfile(newProfile);
          setShowWizard(false);
          setShowPreview(true); // mở preview luôn khi vừa build xong
        }}
      />

      {/* Profile Preview */}
      <ProfilePreview
        show={showPreview}
        onHide={() => setShowPreview(false)}
        profile={profile}
      />
    </>
  );
}

export default NavbarComp;
