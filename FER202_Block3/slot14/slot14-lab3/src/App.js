import React, { useReducer, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { students as studentData } from "./data/students";
import NavbarComp from "./components/NavbarComp";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import SortDropdown from "./components/SortDropdown";
import StudentGrid from "./components/StudentGrid";
import StudentDetailModal from "./components/StudentDetailModal";
import Footer from "./components/Footer";
import { reducer, initialState } from "./reducer";
import ProfileWizard from "./components/ProfileWizard"; // ✅ build profile

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ✅ xử lý filter + search an toàn
  const filteredStudents = useMemo(() => {
    let list = [...studentData];
    const keyword = state.search || ""; // fallback tránh undefined

    // search
    if (keyword.trim() !== "") {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(keyword.toLowerCase()) ||
          s.email.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // age filter
    if (state.ageFilter === "≤20") list = list.filter((s) => s.age <= 20);
    if (state.ageFilter === "21-25") list = list.filter((s) => s.age >= 21 && s.age <= 25);
    if (state.ageFilter === ">25") list = list.filter((s) => s.age > 25);

    // has avatar
    if (state.hasAvatar) list = list.filter((s) => s.avatar);

    // sort
    if (state.sortKey === "age-asc") list.sort((a, b) => a.age - b.age);
    if (state.sortKey === "age-desc") list.sort((a, b) => b.age - a.age);
    if (state.sortKey === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (state.sortKey === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [state]);

  useEffect(() => {
    console.log("Search keyword:", state.search);
  }, [state.search]);

  return (
    <div>
      <NavbarComp />
      <Hero />

      {/* ✅ Build Profile Modal */}
      <div className="container mt-4">
        <ProfileWizard />
      </div>

      <div className="container mt-4">
        <Filters
          search={state.search}
          setSearch={(val) => dispatch({ type: "SET_SEARCH", payload: val })}
          ageFilter={state.ageFilter}
          setAgeFilter={(val) => dispatch({ type: "SET_AGE_FILTER", payload: val })}
          hasAvatar={state.hasAvatar}
          setHasAvatar={(val) => dispatch({ type: "SET_HAS_AVATAR", payload: val })}
        />
        <SortDropdown
          sortKey={state.sortKey}
          setSortKey={(val) => dispatch({ type: "SET_SORT_KEY", payload: val })}
        />
        <StudentGrid
          students={filteredStudents}
          onViewDetails={(student) =>
            dispatch({ type: "SET_SELECTED_STUDENT", payload: student })
          }
        />
      </div>

      <StudentDetailModal
        student={state.selectedStudent}
        onClose={() => dispatch({ type: "SET_SELECTED_STUDENT", payload: null })}
      />
      <Footer />
    </div>
  );
}

export default App;
