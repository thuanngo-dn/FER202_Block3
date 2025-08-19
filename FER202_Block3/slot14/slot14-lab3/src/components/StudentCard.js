import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const fallbackAvatar = "https://via.placeholder.com/300x200.png?text=No+Avatar";

function StudentCard({ student, onViewDetails }) {
  const avatar = student.avatar && student.avatar.trim() !== "" ? student.avatar : fallbackAvatar;

  return (
    <Card className="h-100 shadow-sm">
      <img src={avatar} alt={student.name} className="card-img-top" style={{ objectFit: "contain", height: "200px" }} />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          {student.name} <Badge bg="info">Age: {student.age}</Badge>
        </Card.Title>
        <Card.Text>{student.email}</Card.Text>
        <Button variant="primary" onClick={() => onViewDetails(student)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;
