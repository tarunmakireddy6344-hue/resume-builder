import { formatDate } from '../utils/pdfExport';
import './AcademicTemplate.css';

export default function AcademicTemplate({ resume }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="template-academic">
      {/* Centered Header */}
      <header className="academic-header">
        <h1 className="academic-name">{personalInfo.fullName || 'Your Full Name'}</h1>
        <div className="academic-contact">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span className="academic-email">{personalInfo.email}</span>}
          {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
        </div>
      </header>

      <div className="academic-body">
        {/* Education First for Academic styles */}
        {education.length > 0 && (
          <section className="academic-section">
            <h2 className="academic-section-title">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="academic-item">
                <div className="academic-item-header">
                  <strong>{edu.institution}</strong>
                  <span>{formatDate(edu.start)} – {formatDate(edu.end)}</span>
                </div>
                <div className="academic-item-sub">
                  <span>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="academic-section">
            <h2 className="academic-section-title">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="academic-item">
                <div className="academic-item-header">
                  <strong>{exp.company}</strong>
                  <span>{formatDate(exp.start)} – {exp.current ? 'Present' : formatDate(exp.end)}</span>
                </div>
                <em className="academic-item-role">{exp.role}</em>
                {(exp.roles || exp.description) && (
                  <ul className="academic-list">
                    {(exp.roles || exp.description).split('\n').filter(line => line.trim()).map((line, i) => (
                      <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
                {exp.tools && <p className="academic-tools">Skills used: {exp.tools}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="academic-section">
            <h2 className="academic-section-title">Technical Skills</h2>
            <p className="academic-skills-list"><strong>Competencies:</strong> {skills.join(', ')}</p>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="academic-section">
            <h2 className="academic-section-title">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="academic-item">
                <div className="academic-item-header">
                  <strong>{proj.name}</strong>
                  {proj.link && <span className="academic-link">{proj.link}</span>}
                </div>
                {proj.tech && <em className="academic-item-role">Technology: {proj.tech}</em>}
                {proj.description && <p className="academic-summary">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="academic-section">
            <h2 className="academic-section-title">Certifications</h2>
            {certifications.map(c => (
              <div key={c.id} className="academic-item-header">
                <span>{c.name} — {c.issuer}</span>
                <span>{c.date}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
