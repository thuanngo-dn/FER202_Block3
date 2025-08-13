import React from "react";
import Navbar from "./components/Navbar";
import DisplayText from "./components/DisplayText";
import ListCourses from "./components/ListCourses";
import PeopleES6 from "./components/PeopleES6";
import ArrayReduce from "./components/ArrayReduce";
import CompaniesES6 from "./components/CompaniesES6";
import ClassesExample from "./components/ClassesExample";
import PromiseExample from "./components/PromiseExample";

function App() {
  return (
    <div>
      <Navbar />
      <DisplayText />
      <ListCourses />
      <PeopleES6 />
      <ArrayReduce />
      <CompaniesES6 />
      <ClassesExample />
      <PromiseExample />
    </div>
  );
}

export default App;
