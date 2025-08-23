import React, { useContext, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container my-5" style={{maxWidth: 480}}>
      <Card>
        <Card.Body>
          <h3 className="mb-3">Login</h3>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
