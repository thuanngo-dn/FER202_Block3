import React from "react";
import { Form } from "react-bootstrap";

function StepAddress({ data, onChange }) {
  const errors = {};
  if (!data.country) errors.country = "Country is required";
  if (!data.city?.trim()) errors.city = "City is required";
  if (!data.street?.trim()) errors.street = "Street is required";

  return (
    <Form className="mt-3">
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={data.country}
          onChange={(e) => onChange("address", "country", e.target.value)}
          isInvalid={!!errors.country}
        >
          <option value="">-- Select Country --</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Korea">Korea</option>
          <option value="Italy">Italy</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={data.city}
          onChange={(e) => onChange("address", "city", e.target.value)}
          isInvalid={!!errors.city}
        />
        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          value={data.street}
          onChange={(e) => onChange("address", "street", e.target.value)}
          isInvalid={!!errors.street}
        />
        <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

export default StepAddress;
