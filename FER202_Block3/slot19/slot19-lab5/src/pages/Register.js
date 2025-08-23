import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Registered! (success)");
  };

  return (
    <div className="container my-5" style={{maxWidth: 520}}>
      <Card>
        <Card.Body>
          <h3 className="mb-3">Register</h3>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Create account</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
