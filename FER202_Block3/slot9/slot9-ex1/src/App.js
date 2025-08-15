import React from "react";
import UserForm from "./components/UserForm";

function App() {
  const handleFormSubmit = (data) => {
    console.log("Dữ liệu form:", data);
    alert("Form hợp lệ! Dữ liệu đã được gửi.");
  };

  return (
    <div>
      <h1 className="text-center mt-4">Form Đăng Ký</h1>
      <UserForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
