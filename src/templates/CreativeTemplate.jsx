import { formatDate } from '../utils/pdfExport';
import './CreativeTemplate.css';

export default function CreativeTemplate({ resume }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="template-creative">
      {/* Left sidebar */}
      <div className="creative-sidebar">
        <div className="creative-avatar">
          {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'YN'}
        </div>
        <h1 className="creative-name">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="creative-title">{personalInfo.jobTitle || 'Professional'}</p>

        <div className="creative-sidebar-section">
          <h3 className="creative-sidebar-title">Contact</h3>
          {personalInfo.email && <div className="creative-contact-item">
            <span className="creative-contact-icon">✉</span>{personalInfo.email}
          </div>}
          {personalInfo.phone && <div className="creative-contact-item">
            <span className="creative-contact-icon">📱</span>{personalInfo.phone}
          </div>}
          {personalInfo.location && <div className="creative-contact-item">
            <span className="creative-contact-icon">📍</span>{personalInfo.location}
          </div>}
          {personalInfo.linkedin && <div className="creative-contact-item">
            <span className="creative-contact-icon">in</span>{personalInfo.linkedin}
          </div>}
          {personalInfo.github && <div className="creative-contact-item">
            <span className="creative-contact-icon">gh</span>{personalInfo.github}
          </div>}
        </div>

        {skills.length > 0 && (
          <div className="creative-sidebar-section">
            <h3 className="creative-sidebar-title">Skills</h3>
            <div className="creative-skills">
              {skills.map((s, i) => (
                <div key={i} className="creative-skill-item">
                  <span className="creative-skill-name">{s}</span>
                  <div className="creative-skill-bar">
                    <div className="creative-skill-fill" style={{ width: `${Math.random() * 30 + 70}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="creative-sidebar-section">
            <h3 className="creative-sidebar-title">Certifications</h3>
            {certifications.map((cert) => (
              <div key={cert.id} className="creative-cert">
                <span>{cert.name}</span>
                <small>{cert.issuer}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right main */}
      <div className="creative-main">
        {summary && (
          <CreativeSection title="About Me">
            <p className="creative-summary">{summary}</p>
          </CreativeSection>
        )}

        {experience.length > 0 && (
          <CreativeSection title="Experience">
            {experience.map((exp) => (
              <div key={exp.id} className="creative-item">
                <div className="creative-item-dot" />
                <div className="creative-item-content">
                  <div className="creative-item-header">
                    <strong>{exp.role}</strong>
                    <span className="creative-date">{formatDate(exp.start)} – {exp.current ? 'Present' : formatDate(exp.end)}</span>
                  </div>
                  <em className="creative-company">{exp.company}</em>
                  {(exp.roles || exp.description) && (
                    <ul className="creative-desc-list">
                      {(exp.roles || exp.description).split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                  {exp.tools && <p className="creative-tools">Tech: {exp.tools}</p>}
                </div>
              </div>
            ))}
          </CreativeSection>
        )}

        {education.length > 0 && (
          <CreativeSection title="Education">
            {education.map((edu) => (
              <div key={edu.id} className="creative-item">
                <div className="creative-item-dot" />
                <div className="creative-item-content">
                  <div className="creative-item-header">
                    <strong>{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</strong>
                    <span className="creative-date">{formatDate(edu.start)} – {formatDate(edu.end)}</span>
                  </div>
                  <em className="creative-company">{edu.institution}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</em>
                </div>
              </div>
            ))}
          </CreativeSection>
        )}

        {projects.length > 0 && (
          <CreativeSection title="Projects">
            {projects.map((proj) => (
              <div key={proj.id} className="creative-project">
                <div className="creative-project-header">
                  <strong>{proj.name}</strong>
                  {proj.link && <a href={proj.link} className="creative-link">{proj.link}</a>}
                </div>
                {proj.tech && <em className="creative-company">{proj.tech}</em>}
                {proj.description && <p className="creative-desc">{proj.description}</p>}
              </div>
            ))}
          </CreativeSection>
        )}
      </div>
    </div>
  );
}

function CreativeSection({ title, children }) {
  return (
    <div className="creative-section">
      <h2 className="creative-section-title">
        <span className="creative-section-dot" />
        {title}
      </h2>
      {children}
    </div>
  );
}
