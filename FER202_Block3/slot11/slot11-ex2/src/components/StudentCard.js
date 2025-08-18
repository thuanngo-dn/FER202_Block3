import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Badge } from "react-bootstrap";

const fallbackAvatar =
  "https://via.placeholder.com/300x200.png?text=No+Avatar";

function StudentCard({ student, onViewDetails }) {
  const avatar = student.avatar && student.avatar.trim() !== ""
    ? student.avatar
    : fallbackAvatar;

  return React.createElement(
    Card,
    { className: "h-100 shadow-sm" },
    [
      React.createElement("img", {
        key: "img",
        src: avatar,
        alt: `${student.name} avatar`,
        className: "card-img-top",
        style: { objectFit: "cover", height: "180px" }
      }),
      React.createElement(
        Card.Body,
        { key: "body" },
        [
          React.createElement(
            Card.Title,
            { key: "title", className: "d-flex justify-content-between align-items-center" },
            [
              student.name,
              React.createElement(Badge, { key: "age", bg: "secondary" }, `Age: ${student.age}`)
            ]
          ),
          React.createElement(Card.Text, { key: "email", className: "text-muted" }, student.email),
          React.createElement("div", { key: "id", className: "mb-2 small text-body-tertiary" }, `ID: ${student.id}`),
          React.createElement(
            Button,
            {
              key: "btn",
              variant: "primary",
              onClick: () => onViewDetails && onViewDetails(student)
            },
            "View Details"
          )
        ]
      )
    ]
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  onViewDetails: PropTypes.func
};

export default StudentCard;
