import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Toast,
  ToastContainer,
  Button,
  Form,
  Card,
  Modal,
} from "react-bootstrap";

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Validate
  const isValidName = name.trim() !== "";
  const isValidEmail = email.includes("@");
  const isValidAge = Number(age) >= 1;
  const isFormValid = isValidName && isValidEmail && isValidAge;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    onSubmit({ name, email, age });

    setShowToast(true);
    setShowModal(true);
  };

  return React.createElement(
    React.Fragment,
    null,
    [
      // Form
      React.createElement(
        Form,
        { key: "form", onSubmit: handleSubmit },
        [
          // Name
          React.createElement(
            Form.Group,
            { key: "name", className: "mb-3" },
            React.createElement(Form.Control, {
              type: "text",
              placeholder: "Enter your name",
              value: name,
              onChange: (e) => setName(e.target.value),
              isInvalid: !isValidName && name !== "",
            }),
            React.createElement(
              Form.Control.Feedback,
              { type: "invalid" },
              "Name cannot be empty"
            )
          ),

          // Email
          React.createElement(
            Form.Group,
            { key: "email", className: "mb-3" },
            React.createElement(Form.Control, {
              type: "email",
              placeholder: "Enter your email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              isInvalid: !isValidEmail && email !== "",
            }),
            React.createElement(
              Form.Control.Feedback,
              { type: "invalid" },
              "Email must contain @"
            )
          ),

          // Age
          React.createElement(
            Form.Group,
            { key: "age", className: "mb-3" },
            React.createElement(Form.Control, {
              type: "number",
              placeholder: "Enter your age",
              value: age,
              onChange: (e) => setAge(e.target.value),
              isInvalid: !isValidAge && age !== "",
            }),
            React.createElement(
              Form.Control.Feedback,
              { type: "invalid" },
              "Age must be at least 1"
            )
          ),

          // Submit button
          React.createElement(
            Button,
            {
              key: "submit",
              variant: "primary",
              type: "submit",
              disabled: !isFormValid, // neu true => summit
            },
            "Submit"
          ),
        ]
      ),

      // Toast
      React.createElement(
        ToastContainer,
        { key: "toast", position: "top-center", className: "mt-3" },
        React.createElement(
          Toast,
          {
            show: showToast,
            onClose: () => setShowToast(false),
            delay: 3000,
            autohide: true,
          },
          React.createElement(Toast.Body, null, "Submitted successfully!")
        )
      ),

      // Modal
      React.createElement(
        Modal,
        { key: "modal", show: showModal, onHide: () => setShowModal(false) },
        [
          React.createElement(
            Modal.Header,
            { key: "header", closeButton: true },
            React.createElement(Modal.Title, null, "Profile Info")
          ),
          React.createElement(
            Modal.Body,
            { key: "body" },
            React.createElement(
              Card,
              null,
              React.createElement(
                Card.Body,
                null,
                [
                  React.createElement("p", { key: "name" }, React.createElement("b", null, "Name:"), " ", name),
                  React.createElement("p", { key: "email" }, React.createElement("b", null, "Email:"), " ", email),
                  React.createElement("p", { key: "age" }, React.createElement("b", null, "Age:"), " ", age),
                ]
              )
            )
          ),
        ]
      ),
    ]
  );
}

// PropTypes validation
ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
