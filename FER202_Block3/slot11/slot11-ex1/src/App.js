import React from "react";
import ProfileForm from "./components/ProfileForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // Hàm xử lý khi submit
  const handleProfileSubmit = (data) => {
    console.log("Form data submitted:", data);
  };

  return React.createElement(
    "div",
    { className: "container mt-4" },
    [
      React.createElement("h2", { key: "title", className: "mb-4" }, "Profile Form"),
      React.createElement(ProfileForm, { key: "form", onSubmit: handleProfileSubmit })
    ]
  );
}

export default App;
