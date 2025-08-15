import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});//errors là object map tên field → thông báo lỗi
  const [showAlert, setShowAlert] = useState(false);//showAlert điều khiển có hiển thị Alert tổng quát

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    //validateForm chạy toàn bộ rule, gom lỗi vào newErrors

    // Name
    if (!formData.name) {
      newErrors.name = "Tên không được để trống!";
    } else if (formData.name.length < 3 || formData.name.length > 50) {
      newErrors.name = "Tên phải có từ 3 đến 50 ký tự!";
    }

    // Age
    const age = parseInt(formData.age, 10);
    if (!formData.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else if (isNaN(age)) {
      newErrors.age = "Tuổi phải là số!";
    } else if (age < 18 || age > 100) {
      newErrors.age = "Tuổi phải nằm trong khoảng 18 đến 100!";
    }

    // Email
    if (!formData.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    // Phone
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải 10 chữ số!";
    }

    // Agree
    if (!formData.agree) {
      newErrors.agree = "Bạn phải đồng ý với điều khoản!";
    }

    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "20px" }}>
      {showAlert && (
        <Alert variant="danger">Lỗi: Vui lòng kiểm tra các trường nhập!</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Age */}
        <Form.Group className="mb-3">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Gender */}
        <Form.Group className="mb-3">
          <Form.Label>Giới tính</Form.Label>
          <Form.Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Form.Select>
        </Form.Group>

        {/* Agree */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="agree"
            label="Đồng ý với điều khoản"
            checked={formData.agree}
            onChange={handleChange}
            isInvalid={!!errors.agree}
          />
          <Form.Control.Feedback type="invalid">
            {errors.agree}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Gửi
        </Button>
      </Form>
    </Container>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;
