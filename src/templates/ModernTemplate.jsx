import { formatDate } from '../utils/pdfExport';
import { getContrastColor } from '../utils/colors';
import './ModernTemplate.css';

export default function ModernTemplate({ resume, primaryColor, textColor }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;
  const contrastColor = getContrastColor(primaryColor);

  return (
    <div className="template-modern" style={{ color: textColor, '--template-text-color': textColor }}>
      {/* Header */}
      <div className="modern-header" style={{ background: primaryColor, borderBottom: `4px solid ${primaryColor}` }}>
        <div className="modern-header-left" style={{ color: contrastColor }}>
          <h1 className="modern-name" style={{ color: contrastColor }}>{personalInfo.fullName || 'Your Name'}</h1>
          <p className="modern-title" style={{ color: contrastColor, opacity: 0.9 }}>{personalInfo.jobTitle || 'Professional Title'}</p>
        </div>
        <div className="modern-header-right" style={{ color: contrastColor }}>
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>⌨ {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>🌐 {personalInfo.portfolio}</span>}
        </div>
      </div>

      <div className="modern-body">
        {/* Summary */}
        {summary && (
          <Section title="Professional Summary" primaryColor={primaryColor}>
            <p className="modern-summary">{summary}</p>
          </Section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <Section title="Work Experience" primaryColor={primaryColor}>
            {experience.map((exp) => (
              <div key={exp.id} className="modern-item">
                <div className="modern-item-header">
                  <div>
                    <h3 className="modern-role">{exp.role || 'Job Title'}</h3>
                    <p className="modern-company">{exp.company || 'Company Name'}</p>
                  </div>
                  <span className="modern-date">
                    {formatDate(exp.start)} – {exp.current ? 'Present' : formatDate(exp.end)}
                  </span>
                </div>
                {(exp.roles || exp.description) && (
                  <ul className="modern-desc-list">
                    {(exp.roles || exp.description).split('\n').filter(line => line.trim()).map((line, i) => (
                      <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
                {exp.tools && (
                  <p className="modern-tools"><strong>Tools:</strong> {exp.tools}</p>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <Section title="Education" primaryColor={primaryColor}>
            {education.map((edu) => (
              <div key={edu.id} className="modern-item">
                <div className="modern-item-header">
                  <div>
                    <h3 className="modern-role">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                    <p className="modern-company">{edu.institution}</p>
                    {edu.gpa && <p className="modern-gpa">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="modern-date">
                    {formatDate(edu.start)} – {formatDate(edu.end)}
                  </span>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="Skills" primaryColor={primaryColor}>
            <div className="modern-skills">
              {skills.map((skill, i) => (
                <span key={i} className="modern-skill-tag">{skill}</span>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <Section title="Projects" primaryColor={primaryColor}>
            {projects.map((proj) => (
              <div key={proj.id} className="modern-item">
                <div className="modern-item-header">
                  <div>
                    <h3 className="modern-role">{proj.name || 'Project Name'}</h3>
                    {proj.tech && <p className="modern-company">Built with: {proj.tech}</p>}
                  </div>
                  {proj.link && <a href={proj.link} className="modern-link">{proj.link}</a>}
                </div>
                {proj.description && <p className="modern-desc">{proj.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <Section title="Certifications" primaryColor={primaryColor}>
            {certifications.map((cert) => (
              <div key={cert.id} className="modern-item cert-item">
                <span className="modern-role">{cert.name}</span>
                <span className="modern-company">{cert.issuer} · {cert.date}</span>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, primaryColor, children }) {
  return (
    <div className="modern-section">
      <div className="modern-section-header">
        <h2 className="modern-section-title" style={{ color: primaryColor }}>{title}</h2>
        <div className="modern-section-line" style={{ background: `linear-gradient(90deg, ${primaryColor} 0%, transparent 100%)` }} />
      </div>
      {children}
    </div>
  );
}
