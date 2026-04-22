const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  templateId: { type: String, default: 'modern' },
  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    jobTitle: { type: String, default: '' }
  },
  summary: { type: String, default: '' },
  experience: [{
    company: String,
    role: String,
    start: String,
    end: String,
    current: Boolean,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    start: String,
    end: String,
    gpa: String
  }],
  skills: [String],
  projects: [{
    name: String,
    tech: String,
    link: String,
    description: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
