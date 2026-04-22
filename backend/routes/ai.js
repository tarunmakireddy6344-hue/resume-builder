const express = require('express');
const router = express.Router();
const { basicHeuristicParser, aiParser } = require('../utils/parsers');
require('dotenv').config();
// AI Suggestion route
router.post('/suggest', async (req, res) => {
  try {
    const { section, currentData } = req.body;
    // Mock AI response if OpenAI key is not provided
    const mockSuggestions = {
      summary: "Results-driven professional with a proven track record of delivering high-quality solutions. Adaptable and eager to learn new technologies. Excellent communication and teamwork skills.",
      skills: ["Problem Solving", "Team Leadership", "Agile Methodologies", "Effective Communication"]
    };

    let suggestion = mockSuggestions[section] || "This is an AI suggested placeholder.";
    
    // Simulate API delay
    setTimeout(() => {
      res.json({ suggestion });
    }, 1000);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Parse Resume PDF Text
router.post('/parse', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      console.warn("Parse attempt with no text payload.");
      return res.status(400).json({ error: "No text provided" });
    }

    console.log(`Received parse request. Text length: ${text.length} characters.`);


    const apiKey = process.env.GEMINI_API_KEY;
    const isMockKey = !apiKey || apiKey === 'your_gemini_api_key_here';
    let extractedData;

    if (!isMockKey) {
      console.log("Using Gemini AI for parsing...");
      try {
        extractedData = await aiParser(text, apiKey);
      } catch (err) {
        console.warn("AI Parsing failed, falling back to heuristics:", err.message);
        extractedData = basicHeuristicParser(text);
      }
    } else {
      console.log("No valid API Key found. Using heuristic extraction fallback...");
      extractedData = basicHeuristicParser(text);
    }

    // Add unique IDs to experience/education/projects if AI missed them
    const finalize = (arr) => arr.map(item => ({ id: Date.now() + Math.random(), ...item }));
    if (extractedData.experience) extractedData.experience = finalize(extractedData.experience);
    if (extractedData.education) extractedData.education = finalize(extractedData.education);
    if (extractedData.projects) extractedData.projects = finalize(extractedData.projects);
    if (extractedData.certifications) extractedData.certifications = finalize(extractedData.certifications);

    res.json({ message: 'Success', data: extractedData });

  } catch (err) {
    console.error("Parse Route Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
