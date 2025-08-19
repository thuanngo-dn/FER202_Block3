import React from "react";
import { Modal, Button } from "react-bootstrap";

function StudentDetailModal({ student, onClose }) {
  if (!student) return null;
  return (
    <Modal show={!!student} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>Name:</b> {student.name}</p>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Age:</b> {student.age}</p>
        <img src={student.avatar || "https://via.placeholder.com/300x200.png?text=No+Avatar"} 
             alt={student.name} className="img-fluid" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StudentDetailModal;
