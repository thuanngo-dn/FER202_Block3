import React, { useState, useContext, useRef } from "react";
import {
  Form,
  Button,
  Card,
  ProgressBar,
  Toast,
  InputGroup,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // ref cho input file

  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
    username: "",
    password: "",
    confirm: "",
    question: "pet",
    answer: "",
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("❌ Avatar phải là định dạng ảnh (jpg, png, gif)!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("❌ Avatar phải nhỏ hơn 2MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, avatar: reader.result });
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setForm({ ...form, avatar: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset input file
    }
  };

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const validatePassword = (password) => {
    // Ít nhất 6 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(form.password)) {
      setError(
        "❌ Password phải ≥6 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return;
    }

    if (form.password !== form.confirm) {
      setError("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      avatar: form.avatar,
      username: form.username,
      password: form.password,
      question: form.question,
      answer: form.answer,
    };

    const success = await register(newUser);
    if (success) {
      setToast(true);
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 600 }}>
      <Card>
        <Card.Body>
          <h3 className="mb-3">Register</h3>
          <ProgressBar now={(step / 2) * 100} className="mb-3" />

          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          <Form onSubmit={onSubmit}>
            {/* STEP 1: About */}
            {step === 1 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    ref={fileInputRef} // gắn ref
                  />
                  {form.avatar && (
                    <div className="mt-2 d-flex align-items-center gap-2">
                      <img
                        src={form.avatar}
                        alt="avatar"
                        height={80}
                        className="rounded border"
                      />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={removeAvatar}
                      >
                        ❌ Remove
                      </Button>
                    </div>
                  )}
                </Form.Group>
                <Button onClick={next} variant="primary">
                  Next
                </Button>
              </>
            )}

            {/* STEP 2: Account */}
            {step === 2 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      type="button"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Password ≥6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={form.confirm}
                    onChange={(e) =>
                      setForm({ ...form, confirm: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Secret Question</Form.Label>
                  <Form.Select
                    value={form.question}
                    onChange={(e) =>
                      setForm({ ...form, question: e.target.value })
                    }
                  >
                    <option value="pet">Your first pet?</option>
                    <option value="school">Your primary school?</option>
                    <option value="color">Your favorite color?</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Answer</Form.Label>
                  <Form.Control
                    value={form.answer}
                    onChange={(e) =>
                      setForm({ ...form, answer: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button onClick={prev} variant="secondary">
                    Previous
                  </Button>
                  <Button type="submit" variant="success">
                    Submit
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Toast Success */}
      <Toast
        show={toast}
        onClose={() => setToast(false)}
        delay={1500}
        autohide
        bg="success"
        style={{ position: "fixed", top: 20, right: 20 }}
      >
        <Toast.Body className="text-white">
          ✅ Registration successful. Redirecting to login...
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Register;
