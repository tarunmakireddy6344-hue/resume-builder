import { formatDate } from '../utils/pdfExport';
import { getContrastColor } from '../utils/colors';
import './StartupTemplate.css';

export default function StartupTemplate({ resume, primaryColor, textColor }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;
  const contrastColor = getContrastColor(primaryColor);

  return (
    <div className="template-startup" style={{ color: textColor, '--template-text-color': textColor }}>
      <div className="startup-header" style={{ background: primaryColor }}>
        <div className="startup-header-content" style={{ color: contrastColor }}>
          <h1 className="startup-name" style={{ color: contrastColor }}>{personalInfo.fullName || 'Your Name'}</h1>
          <p className="startup-title" style={{ color: contrastColor, opacity: 0.9 }}>{personalInfo.jobTitle || 'Professional Title'}</p>
          <div className="startup-contact">
            {personalInfo.email && <span className="contact-item">✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span className="contact-item">📱 {personalInfo.phone}</span>}
            {personalInfo.location && <span className="contact-item">📍 {personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="contact-item">🔗 LinkedIn</span>}
            {personalInfo.github && <span className="contact-item">⌨ GitHub</span>}
          </div>
        </div>
      </div>

      <div className="startup-container">
        <div className="startup-main">
          {summary && (
            <div className="startup-section">
              <h2 className="startup-section-label">Abt.</h2>
              <p className="startup-summary">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="startup-section">
              <h2 className="startup-section-label">History</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="startup-item">
                  <div className="startup-item-header">
                    <h3 className="startup-item-role">{exp.role}</h3>
                    <span className="startup-item-date">{formatDate(exp.start)} — {exp.current ? 'Present' : formatDate(exp.end)}</span>
                  </div>
                  <p className="startup-item-company">{exp.company}</p>
                  {(exp.roles || exp.description) && (
                    <ul className="startup-list">
                      {(exp.roles || exp.description).split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div className="startup-section">
              <h2 className="startup-section-label">Builds</h2>
              {projects.map((proj) => (
                <div key={proj.id} className="startup-item">
                  <div className="startup-item-header">
                    <h3 className="startup-item-role">{proj.name}</h3>
                    {proj.link && <span className="startup-item-date">Link</span>}
                  </div>
                  <p className="startup-item-company">{proj.tech}</p>
                  {proj.description && <p className="startup-item-desc">{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="startup-sidebar">
          {skills.length > 0 && (
            <div className="startup-sidebar-section">
              <h2 className="startup-sidebar-label" style={{ borderLeft: `3px solid ${primaryColor}` }}>Skills</h2>
              <div className="startup-skills-grid">
                {skills.map((skill, i) => (
                  <span key={i} className="startup-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="startup-sidebar-section">
              <h2 className="startup-sidebar-label" style={{ borderLeft: `3px solid ${primaryColor}` }}>Edu.</h2>
              {education.map((edu) => (
                <div key={edu.id} className="startup-sidebar-item">
                  <p className="sidebar-item-title">{edu.degree}</p>
                  <p className="sidebar-item-sub">{edu.institution}</p>
                  <p className="sidebar-item-date">{formatDate(edu.start)} — {formatDate(edu.end)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
