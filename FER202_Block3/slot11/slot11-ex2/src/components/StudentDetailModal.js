import React from "react";
import { Modal, Card, Badge } from "react-bootstrap";

const fallbackAvatar =
  "https://via.placeholder.com/600x300.png?text=No+Avatar";

function StudentDetailModal({ student, onClose }) {
  const show = !!student;
  const avatar = student && student.avatar && student.avatar.trim() !== ""
    ? student.avatar
    : fallbackAvatar;

  return React.createElement(
    Modal,
    { show, onHide: onClose, size: "md", centered: true },
    student
      ? [
          React.createElement(
            Modal.Header,
            { key: "header", closeButton: true },
            React.createElement(Modal.Title, null, "Student Details")
          ),
          React.createElement(
            Modal.Body,
            { key: "body" },
            React.createElement(
              Card,
              null,
              [
                React.createElement("img", {
                  key: "img",
                  src: avatar,
                  alt: `${student.name} avatar`,
                  className: "card-img-top",
                  style: { objectFit: "cover", height: "220px" }
                }),
                React.createElement(
                  Card.Body,
                  { key: "cb" },
                  [
                    React.createElement("h5", { key: "name" }, student.name),
                    React.createElement("p", { key: "email", className: "mb-1 text-muted" }, student.email),
                    React.createElement("p", { key: "id", className: "mb-2 small" }, `ID: ${student.id}`),
                    React.createElement(Badge, { key: "age", bg: "secondary" }, `Age: ${student.age}`)
                  ]
                )
              ]
            )
          )
        ]
      : null
  );
}

export default StudentDetailModal;
