import { formatDate } from '../utils/pdfExport';
import { getContrastColor } from '../utils/colors';
import './FunctionalTemplate.css';

export default function FunctionalTemplate({ resume, primaryColor, textColor }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;
  const contrastColor = getContrastColor(primaryColor);

  return (
    <div className="template-functional" style={{ color: textColor, '--template-text-color': textColor }}>
      <div className="functional-sidebar" style={{ background: primaryColor, borderRight: `1px solid rgba(0,0,0,0.1)` }}>
        <div className="functional-sidebar-content" style={{ color: contrastColor }}>
          <div className="sidebar-contact-section">
            <h3 className="sidebar-label" style={{ color: contrastColor, opacity: 0.9 }}>Contact</h3>
            <p className="sidebar-contact-info">{personalInfo.email}</p>
            <p className="sidebar-contact-info">{personalInfo.phone}</p>
            <p className="sidebar-contact-info">{personalInfo.location}</p>
          </div>

          {skills.length > 0 && (
            <div className="sidebar-skill-section">
              <h3 className="sidebar-label" style={{ color: primaryColor }}>Top Skills</h3>
              <ul className="sidebar-skills-list">
                {skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {education.length > 0 && (
            <div className="sidebar-edu-section">
              <h3 className="sidebar-label" style={{ color: primaryColor }}>Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="sidebar-edu-item">
                  <p className="sidebar-edu-degree">{edu.degree}</p>
                  <p className="sidebar-edu-school">{edu.institution}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="functional-main">
        <div className="functional-header">
          <h1 className="functional-name">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="functional-title">{personalInfo.jobTitle || 'Professional Title'}</p>
        </div>

        {summary && (
          <div className="functional-section">
            <h2 className="functional-section-title" style={{ color: primaryColor }}>Summary</h2>
            <p className="functional-summary">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="functional-section">
            <h2 className="functional-section-title" style={{ color: primaryColor }}>Key Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="functional-item">
                <div className="functional-item-header">
                  <h3 className="functional-role">{exp.role}</h3>
                  <span className="functional-date">{formatDate(exp.start)} – {exp.current ? 'Present' : formatDate(exp.end)}</span>
                </div>
                <p className="functional-company">{exp.company}</p>
                {(exp.roles || exp.description) && (
                  <ul className="functional-list">
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
          <div className="functional-section">
            <h2 className="functional-section-title" style={{ color: primaryColor }}>Impactful Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="functional-item">
                <h3 className="functional-role">{proj.name}</h3>
                <p className="functional-company">{proj.tech}</p>
                <p className="functional-desc">{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
