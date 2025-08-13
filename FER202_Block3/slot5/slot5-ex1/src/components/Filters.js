import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function Filters({ setSearchTerm, setMaxPrep, setMaxCook, setSortBy }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 300);
  };

  return (
    <Row className="mb-4">
      <Col md={3}>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
      </Col>
      <Col md={3}>
        <Form.Select onChange={(e) => setMaxPrep(e.target.value)}>
          <option value="">Max Prep</option>
          <option value="5">≤ 5 mins</option>
          <option value="10">≤ 10 mins</option>
          <option value="15">≤ 15 mins</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select onChange={(e) => setMaxCook(e.target.value)}>
          <option value="">Max Cook</option>
          <option value="5">≤ 5 mins</option>
          <option value="10">≤ 10 mins</option>
          <option value="15">≤ 15 mins</option>
          <option value="20">≤ 20 mins</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="name-asc">Name A→Z</option>
          <option value="name-desc">Name Z→A</option>
          <option value="prep-asc">Prep ↑</option>
          <option value="prep-desc">Prep ↓</option>
          <option value="cook-asc">Cook ↑</option>
          <option value="cook-desc">Cook ↓</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
