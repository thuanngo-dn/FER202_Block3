import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";

export default function FormRequest({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ingredient: "",
    maxPrep: "5",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (onSubmitSuccess) onSubmitSuccess();

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        ingredient: "",
        maxPrep: "5",
        notes: ""
      });
    }, 2000);
  };

  return (
    <>
      {submitted && (
        <Alert variant="success" className="py-2">
          ✅ Request submitted successfully!
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Desired Ingredient</Form.Label>
          <Form.Control
            type="text"
            name="ingredient"
            placeholder="Enter ingredient..."
            value={formData.ingredient}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Max Prep Time</Form.Label>
          <Form.Select
            name="maxPrep"
            value={formData.maxPrep}
            onChange={handleChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          <Send /> Submit Request
        </Button>
      </Form>
    </>
  );
}
