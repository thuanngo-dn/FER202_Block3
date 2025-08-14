import React from "react";
import { Card, Button } from "react-bootstrap";

const StudentCard = ({ student }) => {
  return (
    <Card style={{ width: "18rem" }} className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={student.avatar}
        alt={`${student.name}'s avatar`}
        style={{
          height: "250px",         // Chiều cao cố định
          objectFit: "cover",      // Giữ tỉ lệ, cắt phần thừa
          objectPosition: "center" // Canh giữa ảnh
        }}
      />
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>Age: {student.age}</Card.Text>
        <Button variant="primary">Edit</Button>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
