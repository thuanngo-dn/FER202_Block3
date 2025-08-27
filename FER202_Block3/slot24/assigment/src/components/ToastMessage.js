import React from "react";
import { Toast } from "react-bootstrap";

const ToastMessage = ({ message, product }) => (
  <Toast
    show={true}
    autohide
    delay={2000}
    style={{ marginBottom: "10px", minWidth: "250px" }}
    bg="success"
  >
    <Toast.Body className="d-flex align-items-center text-white">
      {product && (
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
      )}
      <div>
        <div>{message}</div>
        {product && <small>{product.name}</small>}
      </div>
    </Toast.Body>
  </Toast>
);

export default ToastMessage;
