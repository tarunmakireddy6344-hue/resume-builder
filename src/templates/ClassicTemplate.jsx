import { formatDate } from '../utils/pdfExport';
import './ClassicTemplate.css';

export default function ClassicTemplate({ resume, primaryColor, textColor }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="template-classic" style={{ color: textColor, '--template-text-color': textColor }}>
      {/* Header */}
      <div className="classic-header">
        <h1 className="classic-name">{personalInfo.fullName || 'Your Full Name'}</h1>
        {personalInfo.jobTitle && <p className="classic-job-title" style={{ color: primaryColor }}>{personalInfo.jobTitle}</p>}
        <div className="classic-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      <div className="classic-body">
        {summary && (
          <ClassicSection title="Objective / Summary" primaryColor={primaryColor}>
            <p className="classic-summary">{summary}</p>
          </ClassicSection>
        )}

        {experience.length > 0 && (
          <ClassicSection title="Professional Experience" primaryColor={primaryColor}>
            {experience.map((exp) => (
              <div key={exp.id} className="classic-item">
                <div className="classic-item-top">
                  <strong style={{ color: primaryColor }}>{exp.role || 'Job Title'}</strong>
                  <span className="classic-date">{formatDate(exp.start)} – {exp.current ? 'Present' : formatDate(exp.end)}</span>
                </div>
                <em className="classic-sub">{exp.company}</em>
                {(exp.roles || exp.description) && (
                  <ul className="classic-desc-list">
                    {(exp.roles || exp.description).split('\n').filter(line => line.trim()).map((line, i) => (
                      <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
                {exp.tools && <p className="classic-tools">Tools: {exp.tools}</p>}
              </div>
            ))}
          </ClassicSection>
        )}

        {education.length > 0 && (
          <ClassicSection title="Education" primaryColor={primaryColor}>
            {education.map((edu) => (
              <div key={edu.id} className="classic-item">
                <div className="classic-item-top">
                  <strong style={{ color: primaryColor }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                  <span className="classic-date">{formatDate(edu.start)} – {formatDate(edu.end)}</span>
                </div>
                <em className="classic-sub">{edu.institution}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</em>
              </div>
            ))}
          </ClassicSection>
        )}

        {skills.length > 0 && (
          <ClassicSection title="Skills" primaryColor={primaryColor}>
            <p className="classic-skills-text">{skills.join(' · ')}</p>
          </ClassicSection>
        )}

        {projects.length > 0 && (
          <ClassicSection title="Projects" primaryColor={primaryColor}>
            {projects.map((proj) => (
              <div key={proj.id} className="classic-item">
                <div className="classic-item-top">
                  <strong style={{ color: primaryColor }}>{proj.name}</strong>
                  {proj.link && <a href={proj.link} className="classic-link">{proj.link}</a>}
                </div>
                {proj.tech && <em className="classic-sub">Tech: {proj.tech}</em>}
                {proj.description && <p className="classic-desc">{proj.description}</p>}
              </div>
            ))}
          </ClassicSection>
        )}

        {certifications.length > 0 && (
          <ClassicSection title="Certifications" primaryColor={primaryColor}>
            {certifications.map((cert) => (
              <div key={cert.id} className="classic-item cert-row">
                <strong style={{ color: primaryColor }}>{cert.name}</strong>
                <span className="classic-sub">{cert.issuer} · {cert.date}</span>
              </div>
            ))}
          </ClassicSection>
        )}
      </div>
    </div>
  );
}

function ClassicSection({ title, primaryColor, children }) {
  return (
    <div className="classic-section">
      <div className="classic-section-title" style={{ color: primaryColor }}>{title}</div>
      <div className="classic-section-line" style={{ background: primaryColor }} />
      {children}
    </div>
  );
}
