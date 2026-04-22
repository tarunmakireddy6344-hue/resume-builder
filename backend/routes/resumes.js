const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// Get user resume
router.get('/:userId', async (req, res) => {
  try {
    let resume = await Resume.findOne({ userId: req.params.userId });
    if (!resume) {
      // Return empty structure if none exists
      return res.json({ message: 'No resume found', data: null });
    }
    res.json({ message: 'Success', data: resume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update or create resume
router.post('/', async (req, res) => {
  try {
    const { userId, resumeData } = req.body;
    let resume = await Resume.findOne({ userId });
    
    if (resume) {
      // Update
      resume.set(resumeData);
      await resume.save();
    } else {
      // Create new
      resume = new Resume({ userId, ...resumeData });
      await resume.save();
    }

    res.json({ message: 'Saved successfully', data: resume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
