import React from "react";
import { Row, Col } from "react-bootstrap";
import StudentCard from "./StudentCard";

function StudentGrid({ students, onViewDetails }) {
  return React.createElement(
    Row,
    { className: "g-3" },
    students.map((s) =>
      React.createElement(
        Col,
        { key: s.id, lg: 4, md: 6, sm: 12 },
        React.createElement(StudentCard, { student: s, onViewDetails })
      )
    )
  );
}

export default StudentGrid;
