import React, { useState, useMemo } from "react";
import { persons } from "./person";

export default function App() {
  const [sortAZ, setSortAZ] = useState(true);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Lấy danh sách skill duy nhất
  const allSkills = [...new Set(persons.flatMap(p => p.skills))];

  // Filter theo min, max, skill, search
  const filteredList = useMemo(() => {
    return persons
      .filter(p => {
        const minCheck = minAge ? p.age >= parseInt(minAge) : true;
        const maxCheck = maxAge ? p.age <= parseInt(maxAge) : true;
        const skillCheck = selectedSkill ? p.skills.includes(selectedSkill) : true;
        const searchCheck = (p.firstName + " " + p.lastName)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return minCheck && maxCheck && skillCheck && searchCheck;
      })
      .sort((a, b) => {
        // Sort đa tiêu chí
        if (a.isActive !== b.isActive) return b.isActive - a.isActive; // true trước
        if (a.age !== b.age) return a.age - b.age; // tuổi tăng dần
        return a.lastName.localeCompare(b.lastName); // A→Z
      })
      .sort((a, b) => {
        // Sort theo FirstName nếu bấm nút A→Z / Z→A
        return sortAZ
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName);
      });
  }, [minAge, maxAge, selectedSkill, searchTerm, sortAZ]);

  // Skill ranking
  const skillCount = useMemo(() => {
    return persons.reduce((acc, p) => {
      p.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {});
  }, []);

  const sortedSkillCount = Object.entries(skillCount).sort((a, b) => b[1] - a[1]);
  const topSkillCount = sortedSkillCount[0]?.[1];

  // Statistics
  const statistics = useMemo(() => {
    const total = persons.length;
    const avgAge = (persons.reduce((sum, p) => sum + p.age, 0) / total).toFixed(1);
    const activeCount = persons.filter(p => p.isActive).length;
    return { total, avgAge, activeCount };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Person List</h2>

      {/* Search */}
      <input
        placeholder="Search by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {/* Min-Max Age */}
      <input
        type="number"
        placeholder="Min age"
        value={minAge}
        onChange={e => setMinAge(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max age"
        value={maxAge}
        onChange={e => setMaxAge(e.target.value)}
      />

      {/* Dropdown Skill */}
      <select
        value={selectedSkill}
        onChange={e => setSelectedSkill(e.target.value)}
      >
        <option value="">All skills</option>
        {allSkills.map(skill => (
          <option key={skill} value={skill}>{skill}</option>
        ))}
      </select>

      {/* Sort button */}
      <button onClick={() => setSortAZ(!sortAZ)}>
        Sort First Name: {sortAZ ? "A→Z" : "Z→A"}
      </button>

      {/* List */}
      <ul>
        {filteredList.length > 0 ? (
          filteredList.map(p => (
            <li key={p.id}>
              {p.firstName} {p.lastName} - {p.age} - {p.city} - {p.skills.join(", ")}
            </li>
          ))
        ) : (
          <li>No found.</li>
        )}
      </ul>

      {/* Skill Ranking */}
      <h3>Skill Ranking</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {sortedSkillCount.map(([skill, count]) => (
            <tr
              key={skill}
              style={{ fontWeight: count === topSkillCount ? "bold" : "normal" }}
            >
              <td>{skill}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Statistics */}
      <h3>Statistics</h3>
      <div>Total people: {statistics.total}</div>
      <div>Average age: {statistics.avgAge}</div>
      <div>Active people: {statistics.activeCount}</div>
    </div>
  );
}
