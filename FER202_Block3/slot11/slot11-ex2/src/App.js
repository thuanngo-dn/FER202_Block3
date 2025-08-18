import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { students as studentData } from "./data/students";
import NavbarComp from "./components/NavbarComp";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import SortDropdown from "./components/SortDropdown";
import StudentGrid from "./components/StudentGrid";
import StudentDetailModal from "./components/StudentDetailModal";
import Footer from "./components/Footer";

function App() {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortKey, setSortKey] = useState("name-asc");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    let list = [...studentData];

    
    if (search.trim() !== "") {
      list = list.filter //Duyệt qua toàn bộ danh sách sinh viên (studentData)
      (
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (ageFilter === "≤20") list = list.filter((s) => s.age <= 20);
    if (ageFilter === "21-25") list = list.filter((s) => s.age >= 21 && s.age <= 25);
    if (ageFilter === ">25") list = list.filter((s) => s.age > 25);

    
    if (hasAvatar) list = list.filter((s) => s.avatar);

  
    if (sortKey === "age-asc") list.sort((a, b) => a.age - b.age);
    if (sortKey === "age-desc") list.sort((a, b) => b.age - a.age);
    if (sortKey === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortKey === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [search, ageFilter, hasAvatar, sortKey]);

  return React.createElement(
    "div",
    null,
    [
      React.createElement(NavbarComp, { key: "nav" }),
      React.createElement(Hero, { key: "hero" }),
      React.createElement(
        "div",
        { key: "container", className: "container mt-3" },
        [
          React.createElement(Filters, {
            key: "filters",
            search,
            setSearch,
            ageFilter,
            setAgeFilter,
            hasAvatar,
            setHasAvatar,
          }),
          React.createElement(SortDropdown, { key: "sort", sortKey, setSortKey }),
          React.createElement(StudentGrid, {
            key: "grid",
            students: filteredStudents,
            onViewDetails: setSelectedStudent,
          }),
        ]
      ),
      React.createElement(StudentDetailModal, {
        key: "modal",
        student: selectedStudent,
        onClose: () => setSelectedStudent(null),
      }),
      React.createElement(Footer, { key: "footer" }),
    ]
  );
}

export default App;
