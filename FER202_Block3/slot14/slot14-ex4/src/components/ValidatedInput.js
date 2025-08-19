import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";


const validateInput = (value) => {
  return value.length >= 5; // Giá trị phải có ít nhất 5 ký tự
};

function ValidatedInput() {
  const [value, setValue] = useState("");          // State lưu trữ giá trị đầu vào
  const [isValid, setIsValid] = useState(true);    // Theo dõi hợp lệ
  const [errorMessage, setErrorMessage] = useState(""); // Lưu thông báo lỗi

  // useEffect để xác thực mỗi khi value thay đổi
  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput);

    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!");
    } else {
      setErrorMessage("");
    }
  }, [value]);

  return (
    <Form className="p-3 border rounded">
      <Form.Group controlId="validatedInput" className="mb-3">
        <Form.Label>Nhập một giá trị</Form.Label>
        <Form.Control
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isValid={isValid && value !== ""}   // chỉ hợp lệ khi có nhập và đúng
          isInvalid={!isValid && value !== ""} // chỉ invalid khi nhập sai
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isValid}>
        Gửi
      </Button>
    </Form>
  );
}

export default ValidatedInput;
