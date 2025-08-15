import React, { useState } from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";

const GENRES = ["All","Action","Animation","Comedy","Drama","Fantasy","Horror","Romance","Sci-Fi","Thriller"];

export default function Filters({ genre, setGenre, setSearchTerm, sortBy, setSortBy, resultCount }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    // debounce nhẹ
    clearTimeout(handleSearch.t);
    handleSearch.t = setTimeout(() => setSearchTerm(val), 250);
  };

  return (
    <div className="searchbar rounded-3 p-3 mb-3 border bg-light">
      <Row className="g-3 align-items-center">
        <Col sm={12} md="auto">
          <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)} aria-label="Filter by genre">
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </Form.Select>
        </Col>

        <Col sm={12} md="auto">
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort by duration">
            <option value="none">Sort: None</option>
            <option value="duration-asc">Duration ↑</option>
            <option value="duration-desc">Duration ↓</option>
          </Form.Select>
        </Col>

        <Col>
          <InputGroup>
            <InputGroup.Text>🔎</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by title…"
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>

        <Col xs="auto" className="text-muted small">{resultCount} results</Col>
      </Row>
    </div>
  );
}
