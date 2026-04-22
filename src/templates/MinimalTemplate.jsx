import { formatDate } from '../utils/pdfExport';
import './MinimalTemplate.css';

export default function MinimalTemplate({ resume }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="template-minimal">
      {/* Name + Title */}
      <div className="minimal-header">
        <h1 className="minimal-name">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="minimal-title">{personalInfo.jobTitle}</p>}
        <div className="minimal-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i} className="minimal-contact-item">{item}</span>
            ))}
        </div>
      </div>

      {summary && (
        <div className="minimal-section">
          <p className="minimal-summary">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <MinSection title="Experience">
          {experience.map((exp) => (
            <div key={exp.id} className="min-item">
              <div className="min-row">
                <span className="min-role">{exp.role}</span>
                <span className="min-date">{formatDate(exp.start)} – {exp.current ? 'Present' : formatDate(exp.end)}</span>
              </div>
              <span className="min-sub">{exp.company}</span>
              {(exp.roles || exp.description) && (
                <ul className="min-desc-list">
                  {(exp.roles || exp.description).split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                  ))}
                </ul>
              )}
              {exp.tools && <p className="min-tools">Tools: {exp.tools}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {education.length > 0 && (
        <MinSection title="Education">
          {education.map((edu) => (
            <div key={edu.id} className="min-item">
              <div className="min-row">
                <span className="min-role">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</span>
                <span className="min-date">{formatDate(edu.start)} – {formatDate(edu.end)}</span>
              </div>
              <span className="min-sub">{edu.institution}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</span>
            </div>
          ))}
        </MinSection>
      )}

      {skills.length > 0 && (
        <MinSection title="Skills">
          <div className="min-skills">
            {skills.map((s, i) => <span key={i} className="min-skill">{s}</span>)}
          </div>
        </MinSection>
      )}

      {projects.length > 0 && (
        <MinSection title="Projects">
          {projects.map((proj) => (
            <div key={proj.id} className="min-item">
              <div className="min-row">
                <span className="min-role">{proj.name}</span>
                {proj.link && <a href={proj.link} className="min-link">{proj.link}</a>}
              </div>
              {proj.tech && <span className="min-sub">{proj.tech}</span>}
              {proj.description && <p className="min-desc">{proj.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {certifications.length > 0 && (
        <MinSection title="Certifications">
          {certifications.map((cert) => (
            <div key={cert.id} className="min-item min-cert">
              <span className="min-role">{cert.name}</span>
              <span className="min-sub">{cert.issuer} · {cert.date}</span>
            </div>
          ))}
        </MinSection>
      )}
    </div>
  );
}

function MinSection({ title, children }) {
  return (
    <div className="minimal-section">
      <h2 className="min-section-title">{title}</h2>
      {children}
    </div>
  );
}
