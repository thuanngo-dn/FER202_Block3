import React from "react";
import { Row, Col } from "react-bootstrap";
import StudentCard from "./StudentCard";

function StudentGrid({ students, onViewDetails }) {
  return (
    <Row>
      {students.map((s) => (
        <Col key={s.id} md={4} className="mb-3">
          <StudentCard student={s} onViewDetails={onViewDetails} />
        </Col>
      ))}
    </Row>
  );
}

export default StudentGrid;
