const { basicHeuristicParser } = require('./utils/parsers');

const sampleText = `
Alexander Pierce
Frontend Software Engineer
alex.pierce@example.com
(555) 0123-4567

SUMMARY
Senior Frontend Developer with 6+ years of experience.
Expert in React and modern CSS.

EXPERIENCE
Global Tech Solutions
Lead Developer
Jan 2018 - Present
- Led the migration of legacy apps to React.
- Mentored junior developers.

Innovative Web Co.
Senior Web Designer
June 2015 - Dec 2017
- Designed user interfaces for high-traffic sites.

EDUCATION
State University
B.S. Computer Science
2012 - 2016

PROJECTS
Project Name: E-Commerce Dashboard
Technologies: React, Socket.io, Highcharts
Description: Built a real-time dashboard for tracking sales and inventory.
2023

Project Name: Task Manager App
Technologies: Node.js, Express, MongoDB
Description: Developed a collaborative task management tool with real-time updates.
2022

SKILLS
React, Node.js, TypeScript, GraphQL, CSS-in-JS, AWS
`;

const result = basicHeuristicParser(sampleText);
console.log("Extraction Result:", JSON.stringify(result, null, 2));

const checks = [
  result.personalInfo.fullName === "Alexander Pierce",
  result.personalInfo.jobTitle.includes("Frontend Software Engineer"),
  result.experience.length === 2,
  result.projects.length === 2,
  result.projects[1].name === "Task Manager App",
  result.projects[1].tech === "Node.js, Express, MongoDB",
  result.experience[0].current === true
];

if (checks.every(c => c)) {
  console.log("✅ Structural Heuristic Test Passed!");
} else {
  console.log("❌ Structural Heuristic Test Failed!");
  console.log("Results Summary:", {
    name: result.personalInfo.fullName,
    expCount: result.experience.length,
    projCount: result.projects.length,
    proj1Name: result.projects[1]?.name,
    proj1Tech: result.projects[1]?.tech
  });
  console.log("Failed Checks:", checks);
  process.exit(1);
}


