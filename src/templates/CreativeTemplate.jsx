import { formatDate } from '../utils/pdfExport';
import { getContrastColor } from '../utils/colors';
import './CreativeTemplate.css';

export default function CreativeTemplate({ resume, primaryColor, textColor }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;
  const contrastColor = getContrastColor(primaryColor);

  return (
    <div className="template-creative" style={{ color: textColor, '--template-text-color': textColor }}>
      {/* Left sidebar */}
      <div className="creative-sidebar" style={{ background: primaryColor, color: contrastColor }}>
        <div className="creative-avatar" style={{ color: primaryColor, background: contrastColor }}>
          {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'YN'}
        </div>
        <h1 className="creative-name" style={{ color: contrastColor }}>{personalInfo.fullName || 'Your Name'}</h1>
        <p className="creative-title" style={{ color: contrastColor, opacity: 0.8 }}>{personalInfo.jobTitle || 'Professional'}</p>

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
        </div>

        {skills.length > 0 && (
          <div className="creative-sidebar-section">
            <h3 className="creative-sidebar-title">Skills</h3>
            <div className="creative-skills">
              {skills.map((s, i) => (
                <div key={i} className="creative-skill-item">
                  <span className="creative-skill-name">{s}</span>
                  <div className="creative-skill-bar" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <div className="creative-skill-fill" style={{ width: `${Math.random() * 30 + 70}%`, background: '#fff' }} />
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
                <small style={{ opacity: 0.8 }}>{cert.issuer}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right main */}
      <div className="creative-main">
        {summary && (
          <CreativeSection title="About Me" primaryColor={primaryColor}>
            <p className="creative-summary">{summary}</p>
          </CreativeSection>
        )}

        {experience.length > 0 && (
          <CreativeSection title="Experience" primaryColor={primaryColor}>
            {experience.map((exp) => (
              <div key={exp.id} className="creative-item">
                <div className="creative-item-dot" style={{ background: primaryColor }} />
                <div className="creative-item-content">
                  <div className="creative-item-header">
                    <strong style={{ color: primaryColor }}>{exp.role}</strong>
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
                  {exp.tools && <p className="creative-tools">Tech: <span style={{ color: primaryColor }}>{exp.tools}</span></p>}
                </div>
              </div>
            ))}
          </CreativeSection>
        )}

        {education.length > 0 && (
          <CreativeSection title="Education" primaryColor={primaryColor}>
            {education.map((edu) => (
              <div key={edu.id} className="creative-item">
                <div className="creative-item-dot" style={{ background: primaryColor }} />
                <div className="creative-item-content">
                  <div className="creative-item-header">
                    <strong style={{ color: primaryColor }}>{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</strong>
                    <span className="creative-date">{formatDate(edu.start)} – {formatDate(edu.end)}</span>
                  </div>
                  <em className="creative-company">{edu.institution}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</em>
                </div>
              </div>
            ))}
          </CreativeSection>
        )}

        {projects.length > 0 && (
          <CreativeSection title="Projects" primaryColor={primaryColor}>
            {projects.map((proj) => (
              <div key={proj.id} className="creative-project">
                <div className="creative-project-header">
                  <strong style={{ color: primaryColor }}>{proj.name}</strong>
                  {proj.link && <a href={proj.link} className="creative-link" style={{ color: primaryColor }}>{proj.link}</a>}
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

function CreativeSection({ title, primaryColor, children }) {
  return (
    <div className="creative-section">
      <h2 className="creative-section-title" style={{ color: primaryColor }}>
        <span className="creative-section-dot" style={{ background: primaryColor }} />
        {title}
      </h2>
      {children}
    </div>
  );
}
