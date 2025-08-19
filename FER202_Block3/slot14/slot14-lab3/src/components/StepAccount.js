import React from "react";
import { Form } from "react-bootstrap";

function StepAccount({ data, onChange }) {
  const errors = {};
  if (!data.username?.trim()) errors.username = "Username is required";
  else if (data.username.length < 6) errors.username = "Username must be at least 6 characters";

  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 8) errors.password = "Password must be at least 8 characters";

  if (data.confirmPassword !== data.password) errors.confirmPassword = "Passwords do not match";

  if (!data.secretQuestion) errors.secretQuestion = "Please select a question";
  if (!data.answer?.trim()) errors.answer = "Answer is required";

  return (
    <Form className="mt-3">
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={data.username}
          onChange={(e) => onChange("account", "username", e.target.value)}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={data.password}
          onChange={(e) => onChange("account", "password", e.target.value)}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={data.confirmPassword}
          onChange={(e) => onChange("account", "confirmPassword", e.target.value)}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Select
          value={data.secretQuestion}
          onChange={(e) => onChange("account", "secretQuestion", e.target.value)}
          isInvalid={!!errors.secretQuestion}
        >
          <option value="">-- Select --</option>
          <option value="pet">What is your first pet’s name?</option>
          <option value="mother">What is your mother’s maiden name?</option>
          <option value="city">In which city were you born?</option>
          <option value="teacher">Who was your favorite teacher?</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.secretQuestion}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={data.answer}
          onChange={(e) => onChange("account", "answer", e.target.value)}
          isInvalid={!!errors.answer}
        />
        <Form.Control.Feedback type="invalid">{errors.answer}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

export default StepAccount;
