const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Basic Regex-based parser to extract simple info when AI is not available.
 */
/**
 * Basic Regex-based parser to extract more info when AI is not available.
 * Uses keyword matching to identify sections.
 */
function basicHeuristicParser(text) {
  const lines = text.split('\n').map(l => l.trim());
  
  const result = {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      jobTitle: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  };

  // 1. Better Personal Info Extraction
  // Look for email/phone first as boundaries
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

  let boundaryIndex = lines.findIndex(l => emailRegex.test(l) || phoneRegex.test(l));
  if (boundaryIndex === -1) boundaryIndex = 5; // Fallback boundary

  // Name is usually the first non-empty line
  const nonEmptyLines = lines.filter(l => l.length > 0);
  result.personalInfo.fullName = nonEmptyLines[0]?.substring(0, 50) || "";
  
  // Job Title is usually the lines between Name and Boundary
  const nameIdxInLines = lines.findIndex(l => l === nonEmptyLines[0]);
  if (boundaryIndex > nameIdxInLines + 1) {
    result.personalInfo.jobTitle = lines.slice(nameIdxInLines + 1, boundaryIndex).filter(l => l !== "").join(' ');
  }

  // Extract Email & Phone from the whole text
  const emailMatch = text.match(emailRegex);
  const phoneMatch = text.match(phoneRegex);
  if (emailMatch) result.personalInfo.email = emailMatch[0];
  if (phoneMatch) result.personalInfo.phone = phoneMatch[0];

  // 1.1 Extract Social Links (LinkedIn, GitHub, Portfolio)
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-z0-9_-]+/i;
  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/[a-z0-9_-]+/i;
  const portfolioRegex = /(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.(?:com|org|net|io|me|dev|portfolio)(?:\/[a-z0-9_-]*)*\b/i;

  const linkedinMatch = text.match(linkedinRegex);
  const githubMatch = text.match(githubRegex);
  const portfolioMatch = text.match(portfolioRegex);

  if (linkedinMatch) result.personalInfo.linkedin = linkedinMatch[0];
  if (githubMatch) result.personalInfo.github = githubMatch[0];
  if (portfolioMatch && !portfolioMatch[0].includes('github.com') && !portfolioMatch[0].includes('linkedin.com')) {
    result.personalInfo.portfolio = portfolioMatch[0];
  }

  // 2. Refined Section Identification
  const sections = {
    summary: ['summary', 'profile', 'objective', 'about me'],
    experience: ['experience', 'work experience', 'employment history', 'professional background', 'work history'],
    education: ['education', 'academic background', 'studies', 'qualifications', 'academic history'],
    skills: ['skills', 'technical skills', 'core competencies', 'expertise', 'technologies', 'skill set'],
    projects: ['projects', 'personal projects', 'key projects', 'projects undertaken', 'notable projects'],
    certifications: ['certifications', 'awards', 'courses', 'licenses', 'achievements']
  };

  let currentSection = null;
  let sectionBuffers = {
    summary: [],
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  };

  lines.forEach(line => {
    if (line.length === 0) {
      if (currentSection) sectionBuffers[currentSection].push("");
      return;
    }

    const lowerLine = line.toLowerCase().replace(/[^a-z\s]/g, '').trim();
    
    let foundHeader = false;
    for (const [key, keywords] of Object.entries(sections)) {
      const match = keywords.some(k => lowerLine === k || (lowerLine.length < 20 && lowerLine.startsWith(k)));
      
      if (match) {
        currentSection = key;
        foundHeader = true;
        break;
      }
    }

    if (!foundHeader && currentSection) {
      sectionBuffers[currentSection].push(line);
    }
  });

  // 3. Smart Processing of Buffers
  
  // Summary
  result.summary = sectionBuffers.summary.filter(l => l !== "").join(' ').substring(0, 500);

  // Skills
  const rawSkills = sectionBuffers.skills.filter(l => l !== "").join(', ');
  const skillList = rawSkills.split(/[,|;•\t]|\s{2,}/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 40);
  result.skills = [...new Set(skillList)].slice(0, 30);

  const dateRegex = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{1,2}[\/\-]\d{2,4}|20\d{2})/i;

  /**
   * Intelligently splits a section buffer into entries using empty lines as primary boundaries.
   */
  const splitByBlocks = (buffer) => {
    const blocks = [];
    let currentBlock = [];
    
    buffer.forEach(line => {
      if (line === "" && currentBlock.length > 0) {
        blocks.push(currentBlock);
        currentBlock = [];
      } else if (line !== "") {
        currentBlock.push(line);
      }
    });

    if (currentBlock.length > 0) blocks.push(currentBlock);
    return blocks;
  };

  // Experience
  const expBlocks = splitByBlocks(sectionBuffers.experience);
  result.experience = expBlocks.map((block, idx) => {
    const dateLine = block.find(l => dateRegex.test(l)) || "";
    const dates = dateLine.match(dateRegex) || [""];
    
    let role = block[1] || "";
    let company = block[0] || "Experience Entry";
    
    if (block[0]?.includes(' - ') || block[0]?.includes(' | ')) {
      const parts = block[0].split(/[\|\-]/);
      company = parts[0].trim();
      role = parts[1].trim();
    }

    const locationLine = block.find(l => l.includes(',') && !l.includes('@') && l.length < 40) || "";
    
    return {
      id: Date.now() + idx,
      company: company.replace(/^(Company|Employer)\s*:/i, '').trim(),
      role: role.replace(/^(Role|Position|Title)\s*:/i, '').trim(),
      location: locationLine,
      start: dates[0] || "",
      end: dates[1] || "",
      current: dateLine.toLowerCase().includes('present') || dateLine.toLowerCase().includes('current'),
      roles: block.slice(1).join('\n')
    };
  });

  // Projects
  const projBlocks = splitByBlocks(sectionBuffers.projects);
  result.projects = projBlocks.map((block, idx) => {
    const text = block.join('\n');
    const nameMatch = text.match(/(?:Project|Name)\s*:\s*([^\n]+)/i);
    const techMatch = text.match(/(?:Tech|Technologies|Toolbox)\s*:\s*([^\n]+)/i);
    
    return {
      id: Date.now() + 100 + idx,
      name: (nameMatch ? nameMatch[1] : block[0] || "Project").trim(),
      tech: (techMatch ? techMatch[1] : "").trim(),
      description: block.filter(l => !/^(Project|Name|Tech|Technologies|Description|Toolbox)\s*:/i.test(l)).join('\n').trim()
    };
  });

  // Education
  const eduBlocks = splitByBlocks(sectionBuffers.education);
  result.education = eduBlocks.map((block, idx) => {
    const dateLine = block.find(l => dateRegex.test(l)) || "";
    return {
      id: Date.now() + 200 + idx,
      institution: block[0] || "University",
      degree: block[1] || "",
      field: "",
      location: block.find(l => l.includes(',') && l.length < 40) || "",
      start: "",
      end: dateLine.match(/\d{4}/)?.[0] || "",
      gpa: block.find(l => /gpa|cgpa/i.test(l))?.match(/\d\.\d/)?.[0] || ""
    };
  });

  return result;
}



/**
 * Intelligent AI parser using Google Gemini.
 */
async function aiParser(text, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert ATS (Applicant Tracking System) resume parser. 
    Your task is to take the following raw text extracted from a resume PDF and convert it into a strictly structured JSON object.

    ### JSON SCHEMA REQUIREMENTS:
    {
      "personalInfo": {
        "fullName": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "linkedin": "string",
        "github": "string",
        "portfolio": "string",
        "jobTitle": "string"
      },
      "summary": "string (max 500 chars)",
      "experience": [
        {
          "company": "string",
          "role": "string",
          "location": "string",
          "start": "YYYY-MM",
          "end": "YYYY-MM or empty string for current",
          "current": boolean,
          "description": "string (bullet points with \n)"
        }
      ],
      "education": [
        {
          "institution": "string",
          "degree": "string",
          "field": "string",
          "location": "string",
          "start": "YYYY",
          "end": "YYYY",
          "gpa": "string"
        }
      ],
      "skills": ["string"],
      "projects": [
        {
          "name": "string",
          "tech": "string",
          "link": "string",
          "description": "string"
        }
      ],
      "certifications": [
        {
          "name": "string",
          "issuer": "string",
          "date": "YYYY-MM"
        }
      ]
    }

    ### RULES:
    1. Only return the JSON object. Do not include any markdown formatting like \`\`\`json.
    2. If a field is not found, use an empty string "" or an empty array [].
    3. Ensure dates are formatted as requested.
    4. Fix common OCR typos if you find them.

    ### RESUME TEXT:
    ${text}

    ### FINAL REMINDER:
    Make sure to extract ALL sections: personalInfo (with ALL links), summary, experience, education, skills, projects, and certifications.
    Ensure 'current' boolean in experience is TRUE if end date is 'Present' or 'Current'.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonText = response.text().trim();
    
    // Clean up if the model included markdown by accident
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```json/, '').replace(/```$/, '').trim();
    }

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    throw new Error("AI parsing failed. Falling back to basic extraction.");
  }
}

module.exports = {
  basicHeuristicParser,
  aiParser
};
