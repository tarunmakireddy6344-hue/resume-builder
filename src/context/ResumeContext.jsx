import { createContext, useContext, useState, useEffect } from 'react';

const defaultResume = {
  title: 'My Resume',
  templateId: 'modern',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    jobTitle: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  customColor: null, // User selected accent color
  customTextColor: null, // User selected text color
};

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      return saved ? JSON.parse(saved) : defaultResume;
    } catch {
      return defaultResume;
    }
  });

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('resumeData', JSON.stringify(resume));
    }, 800);
    return () => clearTimeout(timer);
  }, [resume]);

  const updatePersonalInfo = (data) =>
    setResume((r) => ({ ...r, personalInfo: { ...r.personalInfo, ...data } }));

  const updateSummary = (summary) => setResume((r) => ({ ...r, summary }));

  const updateTemplate = (templateId) => setResume((r) => ({ ...r, templateId }));

  const addExperience = () =>
    setResume((r) => ({
      ...r,
      experience: [
        ...r.experience,
        { id: Date.now(), company: '', role: '', start: '', end: '', current: false, roles: '', tools: '' },
      ],
    }));

  const updateExperience = (id, data) =>
    setResume((r) => ({
      ...r,
      experience: r.experience.map((e) => (e.id === id ? { ...e, ...data } : e)),
    }));

  const removeExperience = (id) =>
    setResume((r) => ({ ...r, experience: r.experience.filter((e) => e.id !== id) }));

  const addEducation = () =>
    setResume((r) => ({
      ...r,
      education: [
        ...r.education,
        { id: Date.now(), institution: '', degree: '', field: '', start: '', end: '', gpa: '' },
      ],
    }));

  const updateEducation = (id, data) =>
    setResume((r) => ({
      ...r,
      education: r.education.map((e) => (e.id === id ? { ...e, ...data } : e)),
    }));

  const removeEducation = (id) =>
    setResume((r) => ({ ...r, education: r.education.filter((e) => e.id !== id) }));

  const updateSkills = (skills) => setResume((r) => ({ ...r, skills }));

  const addProject = () =>
    setResume((r) => ({
      ...r,
      projects: [
        ...r.projects,
        { id: Date.now(), name: '', tech: '', description: '' },
      ],
    }));

  const updateProject = (id, data) =>
    setResume((r) => ({
      ...r,
      projects: r.projects.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }));

  const removeProject = (id) =>
    setResume((r) => ({ ...r, projects: r.projects.filter((p) => p.id !== id) }));

  const addCertification = () =>
    setResume((r) => ({
      ...r,
      certifications: [
        ...r.certifications,
        { id: Date.now(), name: '', issuer: '', date: '' },
      ],
    }));

  const updateCertification = (id, data) =>
    setResume((r) => ({
      ...r,
      certifications: r.certifications.map((c) => (c.id === id ? { ...c, ...data } : c)),
    }));

  const removeCertification = (id) =>
    setResume((r) => ({ ...r, certifications: r.certifications.filter((c) => c.id !== id) }));

  const resetResume = () => setResume(defaultResume);

  const updateColor = (color) => setResume((r) => ({ ...r, customColor: color }));

  const updateTextColor = (color) => setResume((r) => ({ ...r, customTextColor: color }));

  const overwriteResume = (newData) => {
    // Transition old 'description' to new 'roles' if needed
    const formattedExperience = (newData.experience || []).map(exp => ({
      ...exp,
      roles: exp.roles || exp.description || '',
      tools: exp.tools || ''
    }));

    setResume((r) => ({
      ...r,
      ...newData,
      personalInfo: { ...r.personalInfo, ...(newData.personalInfo || {}) },
      experience: formattedExperience,
      education: newData.education || [],
      skills: newData.skills || [],
      projects: newData.projects || [],
      certifications: newData.certifications || []
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        updatePersonalInfo,
        updateSummary,
        updateTemplate,
        addExperience, updateExperience, removeExperience,
        addEducation, updateEducation, removeEducation,
        updateSkills,
        addProject, updateProject, removeProject,
        addCertification, updateCertification, removeCertification,
        resetResume,
        updateColor,
        updateTextColor,
        overwriteResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};
