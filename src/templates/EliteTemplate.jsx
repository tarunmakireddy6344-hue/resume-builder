import { formatDate } from '../utils/pdfExport';
import './EliteTemplate.css';

export default function EliteTemplate({ resume, primaryColor, textColor }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="template-elite" style={{ color: textColor, '--template-text-color': textColor }}>
      <div className="elite-header">
        <h1 className="elite-name">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="elite-title" style={{ color: primaryColor }}>{personalInfo.jobTitle || 'Professional Title'}</p>
        <div className="elite-divider" style={{ borderColor: primaryColor }} />
        <div className="elite-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.portfolio]
            .filter(Boolean)
            .join('  •  ')}
        </div>
      </div>

      <div className="elite-body">
        {summary && (
          <div className="elite-section">
            <h2 className="elite-section-title" style={{ color: primaryColor }}>Professional Statement</h2>
            <p className="elite-summary">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="elite-section">
            <h2 className="elite-section-title" style={{ color: primaryColor }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="elite-item">
                <div className="elite-item-row">
                  <span className="elite-company">{exp.company}</span>
                  <span className="elite-date">
                    {formatDate(exp.start)} – {exp.current ? 'Present' : formatDate(exp.end)}
                  </span>
                </div>
                <p className="elite-role">{exp.role}</p>
                {(exp.roles || exp.description) && (
                  <ul className="elite-list">
                    {(exp.roles || exp.description).split('\n').filter(l => l.trim()).map((line, i) => (
                      <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="elite-section">
            <h2 className="elite-section-title" style={{ color: primaryColor }}>Academic Background</h2>
            {education.map((edu) => (
              <div key={edu.id} className="elite-item">
                <div className="elite-item-row">
                  <span className="elite-company">{edu.institution}</span>
                  <span className="elite-date">{formatDate(edu.start)} – {formatDate(edu.end)}</span>
                </div>
                <p className="elite-role">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="elite-section">
            <h2 className="elite-section-title" style={{ color: primaryColor }}>Core Competencies</h2>
            <p className="elite-skills-text">{skills.join('  •  ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
