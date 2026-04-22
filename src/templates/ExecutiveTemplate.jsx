import { formatDate } from '../utils/pdfExport';
import './ExecutiveTemplate.css';

export default function ExecutiveTemplate({ resume, primaryColor, textColor }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="template-executive" style={{ color: textColor, '--template-text-color': textColor }}>
      {/* Header */}
      <header className="executive-header">
        <h1 className="executive-name">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="executive-title">{personalInfo.jobTitle || 'Executive Professional'}</p>
        <div className="executive-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="executive-social">
          {personalInfo.linkedin && <span className="social-link">LinkedIn: {personalInfo.linkedin}</span>}
          {personalInfo.github && <span className="social-link">GitHub: {personalInfo.github}</span>}
          {personalInfo.portfolio && <span className="social-link">Portfolio: {personalInfo.portfolio}</span>}
        </div>
      </header>

      <div className="executive-body">
        {/* Summary */}
        {summary && (
          <section className="executive-section">
            <h2 className="executive-section-title" style={{ color: primaryColor }}>Executive Summary</h2>
            <div className="section-divider" style={{ background: `linear-gradient(90deg, ${primaryColor} 0%, transparent 100%)` }} />
            <p className="executive-summary">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="executive-section">
            <h2 className="executive-section-title" style={{ color: primaryColor }}>Professional Experience</h2>
            <div className="section-divider" style={{ background: `linear-gradient(90deg, ${primaryColor} 0%, transparent 100%)` }} />
            {experience.map((exp) => (
              <div key={exp.id} className="executive-item">
                <div className="executive-item-top">
                  <div className="role-company">
                    <span className="executive-role">{exp.role || 'Role Title'}</span>
                    <span className="executive-company"> | {exp.company || 'Company'}</span>
                  </div>
                  <span className="executive-date">
                    {formatDate(exp.start)} – {exp.current ? 'Present' : formatDate(exp.end)}
                  </span>
                </div>
                {(exp.roles || exp.description) && (
                  <ul className="executive-list">
                    {(exp.roles || exp.description).split('\n').filter(line => line.trim()).map((line, i) => (
                      <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
                {exp.tools && <p className="executive-tools"><strong>Key Technologies:</strong> {exp.tools}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="executive-section">
            <h2 className="executive-section-title" style={{ color: primaryColor }}>Education</h2>
            <div className="section-divider" style={{ background: `linear-gradient(90deg, ${primaryColor} 0%, transparent 100%)` }} />
            {education.map((edu) => (
              <div key={edu.id} className="executive-item academic-row">
                <div className="edu-left">
                  <span className="executive-role">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
                  <span className="executive-company"> | {edu.institution}</span>
                </div>
                <div className="edu-right">
                  <span className="executive-date">{formatDate(edu.start)} – {formatDate(edu.end)}</span>
                  {edu.gpa && <span className="executive-gpa">GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects / Skills */}
        <div className="executive-footer-grid">
          {skills.length > 0 && (
            <div className="footer-column">
              <h3 className="footer-title" style={{ color: primaryColor }}>Expertise</h3>
              <div className="footer-line" style={{ background: primaryColor }} />
              <div className="executive-skills-cloud">
                {skills.join(' · ')}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div className="footer-column">
              <h3 className="footer-title" style={{ color: primaryColor }}>Certifications</h3>
              <div className="footer-line" style={{ background: primaryColor }} />
              {certifications.map(c => (
                <div key={c.id} className="footer-cert">
                  <strong>{c.name}</strong> - {c.issuer}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
