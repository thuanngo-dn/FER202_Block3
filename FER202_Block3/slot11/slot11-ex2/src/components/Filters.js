import React from "react";
import { Row, Col, Form } from "react-bootstrap";

function Filters({
  search,
  setSearch,
  ageFilter,
  setAgeFilter,
  hasAvatar,
  setHasAvatar
}) {
  return React.createElement(
    Row,
    { className: "gy-2 align-items-end" },
    [
      React.createElement(
        Col,
        { key: "search", md: 6, sm: 12 },
        React.createElement(Form.Group, null,
          [
            React.createElement(Form.Label, { key: "lbl" }, "Search (name/email)"),
            React.createElement(Form.Control, {
              key: "ctl",
              type: "text",
              placeholder: "Type to search...",
              value: search,
              onChange: (e) => setSearch(e.target.value)
            })
          ]
        )
      ),
      React.createElement(
        Col,
        { key: "age", md: 3, sm: 6 },
        React.createElement(Form.Group, null,
          [
            React.createElement(Form.Label, { key: "lbl" }, "Age range"),
            React.createElement(Form.Select, {
              key: "sel",
              value: ageFilter,
              onChange: (e) => setAgeFilter(e.target.value)
            },
              [
                React.createElement("option", { key: "all", value: "all" }, "All"),
                React.createElement("option", { key: "le20", value: "≤20" }, "≤ 20"),
                React.createElement("option", { key: "21-25", value: "21-25" }, "21–25"),
                React.createElement("option", { key: "gt25", value: ">25" }, "> 25")
              ]
            )
          ]
        )
      ),
      React.createElement(
        Col,
        { key: "avatar", md: 3, sm: 6 },
        React.createElement(Form.Check, {
          type: "checkbox",
          id: "hasAvatar",
          label: "Has avatar",
          checked: hasAvatar,
          onChange: (e) => setHasAvatar(e.target.checked)
        })
      )
    ]
  );
}

export default Filters;
