import React from "react";
import { Form } from "react-bootstrap";

function SortDropdown({ sortKey, setSortKey }) {
  return React.createElement(
    "div",
    { className: "d-flex justify-content-end my-3" },
    React.createElement(
      Form.Group,
      { className: "d-flex align-items-center gap-2" },
      [
        React.createElement("span", { key: "lbl", className: "fw-semibold" }, "Sort by:"),
        React.createElement(
          Form.Select,
          {
            key: "sel",
            value: sortKey,
            onChange: (e) => setSortKey(e.target.value),
            style: { maxWidth: 220 }
          },
          [
            React.createElement("option", { key: "name-asc", value: "name-asc" }, "Name A → Z"),
            React.createElement("option", { key: "name-desc", value: "name-desc" }, "Name Z → A"),
            React.createElement("option", { key: "age-asc", value: "age-asc" }, "Age ↑"),
            React.createElement("option", { key: "age-desc", value: "age-desc" }, "Age ↓")
          ]
        )
      ]
    )
  );
}

export default SortDropdown;
