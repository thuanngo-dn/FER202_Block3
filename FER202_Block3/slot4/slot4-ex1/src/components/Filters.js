import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function Filters({ setSearchTerm, setMaxPrep, setMaxCook }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 300); // debounce 300ms
  };

  return (
    <Row className="mb-4">
      <Col md={4} sm={12}>
        <Form.Control
          type="text"
          placeholder="Search by name or ingredients..."
          value={search}
          onChange={handleSearch}
        />
      </Col>
      <Col md={4} sm={6} className="mt-2 mt-sm-0">
        <Form.Select onChange={(e) => setMaxPrep(e.target.value)}>
          <option value="">Max Prep Time</option>
          <option value="5">≤ 5 mins</option>
          <option value="10">≤ 10 mins</option>
          <option value="15">≤ 15 mins</option>
        </Form.Select>
      </Col>
      <Col md={4} sm={6} className="mt-2 mt-sm-0">
        <Form.Select onChange={(e) => setMaxCook(e.target.value)}>
          <option value="">Max Cook Time</option>
          <option value="5">≤ 5 mins</option>
          <option value="10">≤ 10 mins</option>
          <option value="15">≤ 15 mins</option>
          <option value="20">≤ 20 mins</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
