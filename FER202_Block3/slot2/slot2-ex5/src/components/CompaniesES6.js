import React from "react";

function CompaniesES6() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  // Print names
  const names = companies.map(c => c.name);

  // Start after 1987
  const after1987 = companies.filter(c => c.start > 1987);

  // Retail companies with start+1
  const retail = companies
    .filter(c => c.category === "Retail")
    .map(c => ({
      ...c,
      start: c.start + 1
    }));

  // Sort companies by end ASC
  const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

  // Sort ages DESC
  const sortedAges = [...ages].sort((a, b) => b - a);

  // Sum ages
  const sumAges = ages.reduce((acc, age) => acc + age, 0);

  return (
    <div>
      <h2>Companies ES6</h2>
      <p>Company Names: {names.join(", ")}</p>
      <p>Started after 1987: {after1987.map(c => c.name).join(", ")}</p>
      <div>
        <h3>Retail Companies (+1 start year)</h3>
        {retail.map((c, i) => (
          <div key={i}>
            <p>Name: {c.name}</p>
            <p>Category: {c.category}</p>
            <p>Start: {c.start}</p>
            <p>End: {c.end}</p>
          </div>
        ))}
      </div>
      <p>Sorted by end: {sortedCompanies.map(c => c.name).join(", ")}</p>
      <p>Sorted Ages Desc: {sortedAges.join(", ")}</p>
      <p>Sum of Ages: {sumAges}</p>
    </div>
  );
}

export default CompaniesES6;
