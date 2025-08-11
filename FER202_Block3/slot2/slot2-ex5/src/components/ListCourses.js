import React from "react";

function Exercise4() {
  // Danh sách khóa học
  const courses = [
    "React Fundamentals",
    "JavaScript ES6",
    "HTML & CSS",
    "Node.js Basics",
    "Database Management"
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>List of Courses</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default Exercise4;
