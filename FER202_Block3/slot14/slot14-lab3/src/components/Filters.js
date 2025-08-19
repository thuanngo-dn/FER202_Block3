import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function Filters({ search, setSearch, ageFilter, setAgeFilter, hasAvatar, setHasAvatar }) {
  return (
    <Row className="mb-3">
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="all">All Ages</option>
          <option value="<=20">&le; 20</option>
          <option value="21-25">21 - 25</option>
          <option value=">25">&gt; 25</option>
        </Form.Select>
      </Col>
      <Col md={4} className="d-flex align-items-center">
        <Form.Check
          type="checkbox"
          label="Has Avatar"
          checked={hasAvatar}
          onChange={(e) => setHasAvatar(e.target.checked)}
        />
      </Col>
    </Row>
  );
}

export default Filters;
