import React from "react";
import { Dropdown } from "react-bootstrap";

function SortDropdown({ sortKey, setSortKey }) {
  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle variant="secondary">Sort</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSortKey("name-asc")}>Name ↑</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortKey("name-desc")}>Name ↓</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortKey("age-asc")}>Age ↑</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortKey("age-desc")}>Age ↓</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
