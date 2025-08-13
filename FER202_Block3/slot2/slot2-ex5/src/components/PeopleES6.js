import React from "react";

function PeopleES6() {
  const people = [
    { name: "Jack", age: 50 },
    { name: "Michael", age: 9 },
    { name: "John", age: 40 },
    { name: "Ann", age: 19 },
    { name: "Elisabeth", age: 16 }
  ];

  const firstTeen = people.find(p => p.age >= 10 && p.age <= 20);
  const allTeens = people.filter(p => p.age >= 10 && p.age <= 20);
  const everyTeen = people.every(p => p.age >= 10 && p.age <= 20);
  const someTeen = people.some(p => p.age >= 10 && p.age <= 20);

  return (
    <div>
      <h2>People ES6</h2>
      <p>First Teenager: {firstTeen ? firstTeen.name : "None"}</p>
      <p>All Teenagers: {allTeens.map(p => p.name).join(", ")}</p>
      <p>Every person is teenager? {everyTeen ? "Yes" : "No"}</p>
      <p>Any person is teenager? {someTeen ? "Yes" : "No"}</p>
    </div>
  );
}

export default PeopleES6;
