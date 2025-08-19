import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Hero() {
  return (
    <div className="bg-primary text-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="fw-bold">🎓 Welcome to Student Portal</h1>
            <p className="lead">
              This is a simple student management system built with React + Bootstrap.  
              You can search, filter, sort and view details of students easily.
            </p>
          </Col>
          
        </Row>
      </Container>
    </div>
  );
}

export default Hero;
