import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { TEMPLATES } from '../templates';
import ResumeRenderer from '../templates';
import { downloadResumeAsPDF } from '../utils/pdfExport';
import {
  FiUser, FiFileText, FiBriefcase, FiBook, FiCode, FiAward, FiDownload,
  FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiCheck, FiZap, FiEye,
  FiLayout, FiSave, FiRefreshCw
} from 'react-icons/fi';
import Onboarding from '../components/Onboarding';

import { PRESET_COLORS } from '../config/themes';

const STEPS = [
  { id: 'personal', label: 'Personal Info', icon: <FiUser size={16} /> },
  { id: 'summary', label: 'Summary', icon: <FiFileText size={16} /> },
  { id: 'experience', label: 'Experience', icon: <FiBriefcase size={16} /> },
  { id: 'education', label: 'Education', icon: <FiBook size={16} /> },
  { id: 'skills', label: 'Skills', icon: <FiCode size={16} /> },
  { id: 'projects', label: 'Projects', icon: <FiLayout size={16} /> },
  { id: 'certifications', label: 'Certifications', icon: <FiAward size={16} /> },
];

export default function Builder() {
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState('personal');
  const [previewMode, setPreviewMode] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Show onboarding if there's no personal info or experience saved
    const savedData = localStorage.getItem('resumeData');
    if (!savedData) return true;
    const data = JSON.parse(savedData);
    return !(data.personalInfo?.fullName || data.experience?.length > 0);
  });
  const previewRef = useRef(null);

  const {
    resume, updatePersonalInfo, updateSummary, updateTemplate,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    updateSkills, addProject, updateProject, removeProject,
    addCertification, updateCertification, removeCertification,
    resetResume, updateColor, updateTextColor, overwriteResume,
  } = useResume();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all data and start over?')) {
      resetResume();
      setShowOnboarding(true);
    }
  };

  // Apply template from URL param
  useEffect(() => {
    const t = searchParams.get('template');
    if (t) updateTemplate(t);
  }, [searchParams]);

  const handleDownload = async () => {
    setDownloading(true);
    await downloadResumeAsPDF('resume-preview', `${resume.personalInfo.fullName || 'resume'}.pdf`);
    setDownloading(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const completedSteps = {
    personal: !!(resume.personalInfo.fullName && resume.personalInfo.email),
    summary: !!resume.summary,
    experience: resume.experience.length > 0,
    education: resume.education.length > 0,
    skills: resume.skills.length > 0,
    projects: resume.projects.length > 0,
    certifications: resume.certifications.length > 0,
  };

  return (
    <div className="builder-page">
      {showOnboarding && (
        <Onboarding 
          onComplete={() => setShowOnboarding(false)} 
          onImportData={(data) => overwriteResume(data)}
        />
      )}
      
      {/* Builder Header */}
      <div className="builder-topbar">
        <div className="builder-topbar-left">
          <h1 className="builder-title">Resume Builder</h1>
          <span className="builder-autosave">
            <FiCheck size={12} /> Auto-saved
          </span>
        </div>
        <div className="builder-topbar-right">
          <button className="btn btn-ghost btn-sm" onClick={() => setPreviewMode(!previewMode)} id="toggle-preview-btn">
            <FiEye size={16} />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleSave} id="save-btn">
            {saved ? <FiCheck size={16} /> : <FiSave size={16} />}
            {saved ? 'Saved!' : 'Save'}
          </button>
          <button
            className={`btn btn-primary btn-sm ${downloading ? 'loading' : ''}`}
            onClick={handleDownload}
            disabled={downloading}
            id="download-pdf-btn"
          >
            <FiDownload size={16} />
            {downloading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div className="builder-layout">
        {/* Sidebar Steps */}
        {!previewMode && (
          <div className="builder-sidebar">
            {/* Template Switcher */}
            <div className="template-switcher">
              <p className="sidebar-section-label">Template</p>
              <div className="template-options">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    className={`template-option ${resume.templateId === t.id ? 'active' : ''}`}
                    onClick={() => updateTemplate(t.id)}
                    id={`template-option-${t.id}`}
                  >
                    <div className="template-option-color" style={{ background: t.colors[0] }} />
                    <span>{t.name}</span>
                    {resume.templateId === t.id && <FiCheck size={12} className="template-check" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Switcher */}
            <div className="template-switcher" style={{ marginTop: '1.5rem' }}>
              <p className="sidebar-section-label">Accent Color</p>
              <div className="color-picker-container" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
                <input 
                  type="color" 
                  value={resume.customColor || TEMPLATES.find(t => t.id === resume.templateId)?.colors[1] || '#2563EB'} 
                  onChange={(e) => updateColor(e.target.value)}
                  style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  id="custom-color-picker"
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--gray-700)' }}>Custom Color</span>
                  <span style={{ fontSize: '10px', color: 'var(--gray-500)' }}>{resume.customColor || 'Auto-match Template'}</span>
                </div>
                {resume.customColor && (
                  <button 
                    onClick={() => updateColor(null)}
                    style={{ marginLeft: 'auto', border: 'none', background: 'none', color: 'var(--danger)', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Reset
                  </button>
                )}
              </div>
              
              {/* Preset Color Bubbles */}
              <div className="preset-colors" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {PRESET_COLORS.map(pc => (
                  <button
                    key={pc.color}
                    className="preset-color-btn"
                    onClick={() => updateColor(pc.color)}
                    title={pc.name}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: pc.color, 
                      border: resume.customColor === pc.color ? '2px solid #000' : '1px solid var(--gray-200)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
            </div>
            
            {/* Text Color Switcher */}
            <div className="template-switcher" style={{ marginTop: '1.5rem' }}>
              <p className="sidebar-section-label">Text Color</p>
              <div className="color-picker-container" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
                <input 
                  type="color" 
                  value={resume.customTextColor || '#374151'} 
                  onChange={(e) => updateTextColor(e.target.value)}
                  style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  id="text-color-picker"
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--gray-700)' }}>Text Color</span>
                  <span style={{ fontSize: '10px', color: 'var(--gray-500)' }}>{resume.customTextColor || 'System Default'}</span>
                </div>
                {resume.customTextColor && (
                  <button 
                    onClick={() => updateTextColor(null)}
                    style={{ marginLeft: 'auto', border: 'none', background: 'none', color: 'var(--danger)', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Reset
                  </button>
                )}
              </div>
              
              {/* Preset Text Colors */}
              <div className="preset-colors" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {[
                  { name: 'Black', color: '#000000' },
                  { name: 'Dark Gray', color: '#374151' },
                  { name: 'Medium Gray', color: '#6B7280' },
                  { name: 'Navy', color: '#1E3A8A' },
                  { name: 'Charcoal', color: '#334155' }
                ].map(pc => (
                  <button
                    key={pc.color}
                    className="preset-color-btn"
                    onClick={() => updateTextColor(pc.color)}
                    title={pc.name}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: pc.color, 
                      border: resume.customTextColor === pc.color ? '2px solid #3B82F6' : '1px solid var(--gray-200)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="sidebar-divider" />

            {/* Step Nav */}
            <p className="sidebar-section-label">Sections</p>
            <nav className="step-nav">
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  className={`step-btn ${activeStep === step.id ? 'active' : ''} ${completedSteps[step.id] ? 'completed' : ''}`}
                  onClick={() => setActiveStep(step.id)}
                  id={`step-btn-${step.id}`}
                >
                  <span className="step-btn-icon">{step.icon}</span>
                  <span className="step-btn-label">{step.label}</span>
                  {completedSteps[step.id] && (
                    <span className="step-completed-dot">
                      <FiCheck size={10} />
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="sidebar-divider" />

              <button className="sidebar-reset-btn" onClick={handleReset} id="reset-resume-btn">
                <FiRefreshCw size={14} /> Reset & Start Over
              </button>
          </div>
        )}

        {/* Form Panel */}
        {!previewMode && (
          <div className="builder-form-panel">
            <div className="form-panel-inner">
              {activeStep === 'personal' && <PersonalInfoForm data={resume.personalInfo} onUpdate={updatePersonalInfo} />}
              {activeStep === 'summary' && <SummaryForm summary={resume.summary} onUpdate={updateSummary} />}
              {activeStep === 'experience' && (
                <ExperienceForm
                  items={resume.experience}
                  onAdd={addExperience}
                  onUpdate={updateExperience}
                  onRemove={removeExperience}
                />
              )}
              {activeStep === 'education' && (
                <EducationForm
                  items={resume.education}
                  onAdd={addEducation}
                  onUpdate={updateEducation}
                  onRemove={removeEducation}
                />
              )}
              {activeStep === 'skills' && <SkillsForm skills={resume.skills} onUpdate={updateSkills} />}
              {activeStep === 'projects' && (
                <ProjectsForm
                  items={resume.projects}
                  onAdd={addProject}
                  onUpdate={updateProject}
                  onRemove={removeProject}
                />
              )}
              {activeStep === 'certifications' && (
                <CertificationsForm
                  items={resume.certifications}
                  onAdd={addCertification}
                  onUpdate={updateCertification}
                  onRemove={removeCertification}
                />
              )}

              {/* Step Navigation */}
              <div className="step-nav-footer">
                {STEPS.findIndex((s) => s.id === activeStep) > 0 && (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setActiveStep(STEPS[STEPS.findIndex((s) => s.id === activeStep) - 1].id)}
                  >
                    ← Previous
                  </button>
                )}
                {STEPS.findIndex((s) => s.id === activeStep) < STEPS.length - 1 && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveStep(STEPS[STEPS.findIndex((s) => s.id === activeStep) + 1].id)}
                    style={{ marginLeft: 'auto' }}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preview Panel */}
        <div className={`builder-preview-panel ${previewMode ? 'fullscreen' : ''}`}>
          <div className="preview-header">
            <span className="preview-title">Live Preview</span>
            <span className="badge badge-primary">{TEMPLATES.find((t) => t.id === resume.templateId)?.name}</span>
          </div>
          <div className="preview-scroll-area">
            <div className="preview-a4" id="resume-preview" ref={previewRef}>
              <ResumeRenderer resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== FORM SECTIONS ========== */

function PersonalInfoForm({ data, onUpdate }) {
  return (
    <div className="form-section">
      <div className="form-section-header">
        <FiUser size={20} />
        <div>
          <h2 className="form-section-title">Personal Information</h2>
          <p className="form-section-sub">This appears at the top of your resume.</p>
        </div>
      </div>
      <div className="form-row-2">
        <FormField label="Full Name *" id="fullName" value={data.fullName} placeholder="John Doe"
          onChange={(v) => onUpdate({ fullName: v })} />
        <FormField label="Job Title" id="jobTitle" value={data.jobTitle} placeholder="Software Engineer"
          onChange={(v) => onUpdate({ jobTitle: v })} />
      </div>
      <div className="form-row-2">
        <FormField label="Email *" id="email" type="email" value={data.email} placeholder="john@example.com"
          onChange={(v) => onUpdate({ email: v })} />
        <FormField label="Phone" id="phone" type="tel" value={data.phone} placeholder="+91 98765 43210"
          onChange={(v) => onUpdate({ phone: v })} />
      </div>
      <div className="form-row-2">
        <FormField label="Location" id="location" value={data.location} placeholder="Bangalore, India"
          onChange={(v) => onUpdate({ location: v })} />
        <FormField label="LinkedIn" id="linkedin" value={data.linkedin} placeholder="linkedin.com/in/johndoe"
          onChange={(v) => onUpdate({ linkedin: v })} />
      </div>
      <div className="form-row-2">
        <FormField label="GitHub" id="github" value={data.github} placeholder="github.com/johndoe"
          onChange={(v) => onUpdate({ github: v })} />
        <FormField label="Portfolio / Website" id="portfolio" value={data.portfolio} placeholder="johndoe.dev"
          onChange={(v) => onUpdate({ portfolio: v })} />
      </div>
    </div>
  );
}

function SummaryForm({ summary, onUpdate }) {
  const aiSuggestion = `Results-driven software engineer with 3+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud infrastructure. Passionate about clean code and delivering exceptional user experiences. Seeking to leverage expertise in a challenging senior engineering role.`;

  return (
    <div className="form-section">
      <div className="form-section-header">
        <FiFileText size={20} />
        <div>
          <h2 className="form-section-title">Professional Summary</h2>
          <p className="form-section-sub">A brief 2–4 sentence overview of your career. ATS scans this heavily.</p>
        </div>
      </div>
      <div className="ai-suggest-banner">
        <FiZap size={14} />
        <span>AI Suggestion</span>
        <button className="btn btn-sm ai-suggest-btn" onClick={() => onUpdate(aiSuggestion)} id="ai-summary-btn">
          Use Suggestion
        </button>
      </div>
      <div className="form-group">
        <label className="form-label">Summary *</label>
        <textarea
          className="form-input"
          rows={5}
          placeholder="Write a compelling professional summary..."
          value={summary}
          onChange={(e) => onUpdate(e.target.value)}
          id="summary-textarea"
        />
        <span className="form-hint">{summary.length} / 500 characters recommended</span>
      </div>
    </div>
  );
}

function ExperienceForm({ items, onAdd, onUpdate, onRemove }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="form-section">
      <div className="form-section-header">
        <FiBriefcase size={20} />
        <div>
          <h2 className="form-section-title">Work Experience</h2>
          <p className="form-section-sub">Add your most recent positions first (reverse chronological).</p>
        </div>
      </div>

      {items.map((exp, idx) => (
        <CollapsibleItem
          key={exp.id}
          title={exp.role || `Experience ${idx + 1}`}
          subtitle={exp.company}
          expanded={expanded === exp.id}
          onToggle={() => setExpanded(expanded === exp.id ? null : exp.id)}
          onRemove={() => onRemove(exp.id)}
        >
          <div className="form-row-2">
            <FormField label="Job Title" id={`role-${exp.id}`} value={exp.role} placeholder="Software Engineer"
              onChange={(v) => onUpdate(exp.id, { role: v })} />
            <FormField label="Company" id={`company-${exp.id}`} value={exp.company} placeholder="Google"
              onChange={(v) => onUpdate(exp.id, { company: v })} />
          </div>
          <div className="form-row-3">
            <FormField label="Start Date" id={`start-${exp.id}`} type="month" value={exp.start}
              onChange={(v) => onUpdate(exp.id, { start: v })} />
            <FormField label="End Date" id={`end-${exp.id}`} type="month" value={exp.end}
              onChange={(v) => onUpdate(exp.id, { end: v })} disabled={exp.current} />
            <div className="form-group">
              <label className="form-label" style={{ opacity: 0 }}>.</label>
              <label className="checkbox-label">
                <input type="checkbox" checked={exp.current}
                  onChange={(e) => onUpdate(exp.id, { current: e.target.checked })} />
                Currently Working
              </label>
            </div>
          </div>
          <FormField 
            label="Tools & Technologies Used" 
            id={`tools-${exp.id}`} 
            value={exp.tools} 
            placeholder="React, Node.js, AWS, MongoDB"
            onChange={(v) => onUpdate(exp.id, { tools: v })} 
          />
          <div className="form-group">
            <label className="form-label">Roles and Responsibilities</label>
            <textarea className="form-input" rows={4}
              placeholder="Press Enter for new bullet points:&#10;• Led a team of 5 to build a real-time dashboard...&#10;• Reduced API response time by 40%..."
              value={exp.roles || exp.description || ""}
              onChange={(e) => onUpdate(exp.id, { roles: e.target.value })}
              id={`roles-${exp.id}`}
            />
          </div>
          
        </CollapsibleItem>
      ))}

      <button className="btn-add-item" onClick={onAdd} id="add-experience-btn">
        <FiPlus size={16} /> Add Work Experience
      </button>
    </div>
  );
}

function EducationForm({ items, onAdd, onUpdate, onRemove }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="form-section">
      <div className="form-section-header">
        <FiBook size={20} />
        <div>
          <h2 className="form-section-title">Education</h2>
          <p className="form-section-sub">List your highest degree first.</p>
        </div>
      </div>

      {items.map((edu, idx) => (
        <CollapsibleItem
          key={edu.id}
          title={edu.degree || `Education ${idx + 1}`}
          subtitle={edu.institution}
          expanded={expanded === edu.id}
          onToggle={() => setExpanded(expanded === edu.id ? null : edu.id)}
          onRemove={() => onRemove(edu.id)}
        >
          <div className="form-row-2">
            <FormField label="Degree" id={`degree-${edu.id}`} value={edu.degree} placeholder="B.Tech"
              onChange={(v) => onUpdate(edu.id, { degree: v })} />
            <FormField label="Field of Study" id={`field-${edu.id}`} value={edu.field} placeholder="Computer Science"
              onChange={(v) => onUpdate(edu.id, { field: v })} />
          </div>
          <FormField label="Institution" id={`institution-${edu.id}`} value={edu.institution} placeholder="IIT Bombay"
            onChange={(v) => onUpdate(edu.id, { institution: v })} />
          <div className="form-row-3">
            <FormField label="Start Date" id={`edu-start-${edu.id}`} type="month" value={edu.start}
              onChange={(v) => onUpdate(edu.id, { start: v })} />
            <FormField label="End Date" id={`edu-end-${edu.id}`} type="month" value={edu.end}
              onChange={(v) => onUpdate(edu.id, { end: v })} />
            <FormField label="GPA (optional)" id={`gpa-${edu.id}`} value={edu.gpa} placeholder="8.5"
              onChange={(v) => onUpdate(edu.id, { gpa: v })} />
          </div>
        </CollapsibleItem>
      ))}

      <button className="btn-add-item" onClick={onAdd} id="add-education-btn">
        <FiPlus size={16} /> Add Education
      </button>
    </div>
  );
}

function SkillsForm({ skills, onUpdate }) {
  const [input, setInput] = useState('');

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onUpdate([...skills, trimmed]);
    }
    setInput('');
  };

  const removeSkill = (s) => onUpdate(skills.filter((sk) => sk !== s));

  const suggestedSkills = ['React', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Git', 'REST APIs', 'GraphQL', 'SQL', 'Figma'];

  return (
    <div className="form-section">
      <div className="form-section-header">
        <FiCode size={20} />
        <div>
          <h2 className="form-section-title">Skills</h2>
          <p className="form-section-sub">Add technical and soft skills. ATS matches these against job descriptions.</p>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Add Skill</label>
        <div className="skill-input-row">
          <input
            className="form-input"
            type="text"
            placeholder="e.g. React, Python, Communication..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            id="skill-input"
          />
          <button className="btn btn-primary btn-sm" onClick={addSkill} id="add-skill-btn">
            <FiPlus size={16} />
          </button>
        </div>
      </div>

      {skills.length > 0 && (
        <div className="skills-tags">
          {skills.map((s) => (
            <span key={s} className="skill-tag">
              {s}
              <button onClick={() => removeSkill(s)} className="skill-remove" aria-label={`Remove ${s}`}>×</button>
            </span>
          ))}
        </div>
      )}

      <div className="suggested-skills">
        <p className="suggested-label">Suggested Skills</p>
        <div className="suggested-chips">
          {suggestedSkills.filter((s) => !skills.includes(s)).map((s) => (
            <button key={s} className="suggested-chip" onClick={() => onUpdate([...skills, s])} id={`suggest-${s}`}>
              + {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsForm({ items, onAdd, onUpdate, onRemove }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="form-section">
      <div className="form-section-header">
        <FiLayout size={20} />
        <div>
          <h2 className="form-section-title">Projects</h2>
          <p className="form-section-sub">Showcase your best work. Include personal, academic, and open-source projects.</p>
        </div>
      </div>

      {items.map((proj, idx) => (
        <CollapsibleItem
          key={proj.id}
          title={proj.name || `Project ${idx + 1}`}
          subtitle={proj.tech}
          expanded={expanded === proj.id}
          onToggle={() => setExpanded(expanded === proj.id ? null : proj.id)}
          onRemove={() => onRemove(proj.id)}
        >
          <div className="form-row-2">
            <FormField label="Project Name" id={`proj-name-${proj.id}`} value={proj.name} placeholder="E-Commerce Platform"
              onChange={(v) => onUpdate(proj.id, { name: v })} />
            
          </div>
          <FormField label="Technologies Used" id={`proj-tech-${proj.id}`} value={proj.tech}
            placeholder="React, Node.js, MongoDB, Express" onChange={(v) => onUpdate(proj.id, { tech: v })} />
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={3}
              placeholder="Describe what you built, the problem it solves, and your impact..."
              value={proj.description} onChange={(e) => onUpdate(proj.id, { description: e.target.value })}
              id={`proj-desc-${proj.id}`}
            />
          </div>
        </CollapsibleItem>
      ))}

      <button className="btn-add-item" onClick={onAdd} id="add-project-btn">
        <FiPlus size={16} /> Add Project
      </button>
    </div>
  );
}

function CertificationsForm({ items, onAdd, onUpdate, onRemove }) {
  return (
    <div className="form-section">
      <div className="form-section-header">
        <FiAward size={20} />
        <div>
          <h2 className="form-section-title">Certifications</h2>
          <p className="form-section-sub">Add relevant certifications and courses.</p>
        </div>
      </div>

      {items.map((cert, idx) => (
        <div key={cert.id} className="cert-form-item">
          <div className="cert-form-row">
            <div className="form-row-3" style={{ flex: 1 }}>
              <FormField label="Certification" id={`cert-name-${cert.id}`} value={cert.name}
                placeholder="AWS Certified Developer" onChange={(v) => onUpdate(cert.id, { name: v })} />
              <FormField label="Issuer" id={`cert-issuer-${cert.id}`} value={cert.issuer}
                placeholder="Amazon" onChange={(v) => onUpdate(cert.id, { issuer: v })} />
              <FormField label="Date" id={`cert-date-${cert.id}`} type="month" value={cert.date}
                onChange={(v) => onUpdate(cert.id, { date: v })} />
            </div>
            <button className="item-remove-btn" onClick={() => onRemove(cert.id)} id={`remove-cert-${cert.id}`}>
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      <button className="btn-add-item" onClick={onAdd} id="add-cert-btn">
        <FiPlus size={16} /> Add Certification
      </button>
    </div>
  );
}

/* ========== REUSABLE COMPONENTS ========== */

function FormField({ label, id, type = 'text', value, placeholder, onChange, disabled }) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className="form-input"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}

function CollapsibleItem({ title, subtitle, expanded, onToggle, onRemove, children }) {
  return (
    <div className={`collapsible-item ${expanded ? 'expanded' : ''}`}>
      <div className="collapsible-header" onClick={onToggle}>
        <div className="collapsible-title-group">
          <span className="collapsible-title">{title}</span>
          {subtitle && <span className="collapsible-sub">{subtitle}</span>}
        </div>
        <div className="collapsible-actions">
          <button className="item-remove-btn" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
            <FiTrash2 size={14} />
          </button>
          {expanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </div>
      </div>
      {expanded && <div className="collapsible-body">{children}</div>}
    </div>
  );
}
