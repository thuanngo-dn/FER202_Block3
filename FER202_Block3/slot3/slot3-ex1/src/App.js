import React, { useState } from "react";

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

function App() {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

 
  const filteredCompanies = companies
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (categoryFilter ? c.category === categoryFilter : true))
    .sort((a, b) => {
      if (sortOption === "yearAsc") return a.start - b.start;
      if (sortOption === "yearDesc") return b.start - a.start;
      if (sortOption === "startEnd")
        return (a.end - a.start) - (b.end - b.start);
      return 0;
    });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Company List</h1>

      <input
        type="text"
        placeholder="Search company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      >
        <option value="">Sort by...</option>
        <option value="yearAsc">Start Year Ascending</option>
        <option value="yearDesc">Start Year Descending</option>
        <option value="startEnd">Start-End Range</option>
      </select>

     
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="">All Categories</option>
        <option value="Finance">Finance</option>
        <option value="Retail">Retail</option>
        <option value="Auto">Auto</option>
        <option value="Technology">Technology</option>
      </select>

     
      {filteredCompanies.length > 0 ? (
        <table
          border="1"
          style={{
            marginTop: "20px",
            borderCollapse: "collapse",
            width: "100%"
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>Name</th>
              <th>Category</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company, index) => (
              <tr key={index}>
                <td>{company.name}</td>
                <td>{company.category}</td>
                <td>{company.start}</td>
                <td>{company.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "20px", color: "red" }}>No result</p>
      )}
    </div>
  );
}

export default App;
