// src/pages/Login.js
import React, { useContext, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState(""); // username hoặc email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectUri = new URLSearchParams(location.search).get("redirect_uri") || "/";

  const onSubmit = (e) => {
    e.preventDefault();
    const success = login(identifier, password); // ✅ cho phép dùng username hoặc email
    if (success) {
      navigate(redirectUri); // quay lại trang mong muốn
    } else {
      setError("❌ Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 480 }}>
      <Card>
        <Card.Body>
          <h3 className="mb-3">Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter username or email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 mb-3">
              Login
            </Button>
            <div className="text-center">
              <Link to="/register">👉 Create an account</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
