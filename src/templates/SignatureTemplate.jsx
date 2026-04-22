import { formatDate } from '../utils/pdfExport';
import { getContrastColor } from '../utils/colors';
import './SignatureTemplate.css';

export default function SignatureTemplate({ resume, primaryColor, textColor }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;
  const contrastColor = getContrastColor(primaryColor);

  return (
    <div className="template-signature" style={{ color: textColor, '--template-text-color': textColor }}>
      <div className="signature-sidebar" style={{ background: primaryColor, color: contrastColor }}>
        <div className="signature-header" style={{ borderBottomColor: contrastColor }}>
          <h1 className="signature-name" style={{ color: contrastColor }}>{personalInfo.fullName || 'Your Name'}</h1>
          <p className="signature-title" style={{ color: contrastColor, opacity: 0.9 }}>{personalInfo.jobTitle || 'Executive Title'}</p>
        </div>

        <div className="signature-contact">
          <div className="signature-contact-item">
            <span className="sc-label" style={{ opacity: 0.8, color: '#fff' }}>Email</span>
            <span className="sc-value">{personalInfo.email}</span>
          </div>
          {personalInfo.phone && (
            <div className="signature-contact-item">
              <span className="sc-label">Phone</span>
              <span className="sc-value">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="signature-contact-item">
              <span className="sc-label">Location</span>
              <span className="sc-value">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="signature-contact-item">
              <span className="sc-label">LinkedIn</span>
              <span className="sc-value">{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="signature-sidebar-section">
            <h3 className="ss-title" style={{ color: '#fff' }}>Expertise</h3>
            <div className="signature-skills-grid">
              {skills.map((skill, i) => (
                <span key={i} className="signature-skill-badge" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="signature-sidebar-section">
            <h3 className="ss-title">Certifications</h3>
            {certifications.map(cert => (
              <div key={cert.id} className="signature-cert-item">
                <p className="cert-name">{cert.name}</p>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="signature-main">
        {summary && (
          <section className="signature-main-section">
            <h2 className="sm-title" style={{ color: primaryColor }}>Professional Summary</h2>
            <div className="sm-divider" style={{ background: primaryColor }} />
            <p className="signature-summary-text">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="signature-main-section">
            <h2 className="sm-title" style={{ color: primaryColor }}>Work History</h2>
            <div className="sm-divider" style={{ background: primaryColor }} />
            <div className="signature-timeline">
              {experience.map((exp) => (
                <div key={exp.id} className="signature-timeline-item">
                  <div className="timeline-dot" style={{ borderColor: primaryColor }} />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <div>
                        <h4 className="timeline-role">{exp.role}</h4>
                        <p className="timeline-company">{exp.company}</p>
                      </div>
                      <span className="timeline-date" style={{ color: primaryColor }}>
                        {formatDate(exp.start)} – {exp.current ? 'Present' : formatDate(exp.end)}
                      </span>
                    </div>
                    
                    {(exp.roles || exp.description) && (
                      <ul className="timeline-list">
                        {(exp.roles || exp.description).split('\n').filter(l => l.trim()).map((line, i) => (
                          <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                        ))}
                      </ul>
                    )}
                    
                    {exp.tools && (
                      <div className="timeline-tools">
                        <span className="tools-label">Technologies:</span> {exp.tools}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="signature-main-section">
            <h2 className="sm-title" style={{ color: primaryColor }}>Education</h2>
            <div className="sm-divider" style={{ background: primaryColor }} />
            {education.map((edu) => (
              <div key={edu.id} className="signature-edu-item">
                <div className="edu-header">
                  <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                  <span>{formatDate(edu.start)} – {formatDate(edu.end)}</span>
                </div>
                <p className="edu-institution">{edu.institution} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section className="signature-main-section">
            <h2 className="sm-title" style={{ color: primaryColor }}>Key Projects</h2>
            <div className="sm-divider" style={{ background: primaryColor }} />
            {projects.map((proj) => (
              <div key={proj.id} className="signature-proj-item">
                <div className="proj-header">
                  <strong>{proj.name}</strong>
                  {proj.link && <span className="proj-link">{proj.link.replace(/^https?:\/\//, '')}</span>}
                </div>
                {proj.tech && <p className="proj-tech">Tech: {proj.tech}</p>}
                {proj.description && <p className="proj-desc">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
