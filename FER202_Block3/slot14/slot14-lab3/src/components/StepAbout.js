import React from "react";
import { Form, Image } from "react-bootstrap";

function StepAbout({ data, onChange }) {
  const errors = {};
  if (!data.name?.trim()) errors.name = "Full name is required";

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email must be a valid address (contain @)";
  }

  if (!data.age) errors.age = "Age is required";
  else if (data.age <= 0) errors.age = "Age must be > 0";

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange("about", "avatar", reader.result); // Lưu base64 vào state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form className="mt-3">
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={data.name}
          onChange={(e) => onChange("about", "name", e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={data.email}
          onChange={(e) => onChange("about", "email", e.target.value)}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          value={data.age}
          onChange={(e) => onChange("about", "age", e.target.value)}
          isInvalid={!!errors.age}
        />
        <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        {data.avatar && (
          <div className="mt-2 text-center">
            <Image
              src={data.avatar}
              alt="Avatar Preview"
              roundedCircle
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          </div>
        )}
      </Form.Group>
    </Form>
  );
}

export default StepAbout;
