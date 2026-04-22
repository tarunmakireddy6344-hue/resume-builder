import { Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { TEMPLATES } from '../templates';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import './Templates.css';

const features = ['ATS Optimized', 'PDF Export', 'Live Preview', 'Free Forever'];

export default function Templates() {
  const { updateTemplate } = useResume();

  return (
    <div className="templates-page">
      {/* Header Hero */}
      <div className="templates-hero">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Resume Templates</span>
            <h1 className="section-title" style={{ fontSize: '3rem' }}>
              Choose Your Perfect<br />
              <span className="text-gradient">Resume Template</span>
            </h1>
            <div className="divider" />
            <p className="section-subtitle">
              All templates are professionally designed, ATS-friendly, and completely free.
              Pick one and start building your resume instantly.
            </p>
            <div className="templates-hero-features">
              {features.map((f) => (
                <span key={f} className="hero-trust-item">
                  <FiCheck size={14} style={{ color: 'var(--success)' }} /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <section className="section">
        <div className="container">
          <div className="templates-full-grid">
            {TEMPLATES.map((t) => (
              <div key={t.id} className="template-full-card" id={`template-card-${t.id}`}>
                {/* Preview */}
                <div className="template-full-preview">
                  <div className="tp-preview-inner">
                    {/* Mock resume visual */}
                    <div className="tp-mock-header" style={{ background: t.colors[0] }}>
                      <div className="tp-mock-name" />
                      <div className="tp-mock-title" />
                      {t.id === 'creative' ? (
                        <div className="tp-mock-avatar" />
                      ) : (
                        <div className="tp-mock-contacts">
                          <div /><div /><div />
                        </div>
                      )}
                    </div>
                    <div className="tp-mock-body">
                      {['Experience', 'Education', 'Skills'].map((sec) => (
                        <div key={sec} className="tp-mock-section">
                          <div className="tp-mock-section-title" style={{ background: t.colors[1] }} />
                          <div className="tp-mock-line" />
                          <div className="tp-mock-line" style={{ width: '80%' }} />
                          <div className="tp-mock-line" style={{ width: '65%' }} />
                        </div>
                      ))}
                      <div className={`tp-mock-skills`}>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="tp-mock-skill-tag" style={{ background: `${t.colors[2]}40` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="template-badge-overlay">
                    <span className={`badge badge-${t.badgeType}`}>{t.badge}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="template-full-info">
                  <div className="template-color-palette">
                    {t.colors.map((c, i) => (
                      <span key={i} className="color-swatch" style={{ background: c }} />
                    ))}
                  </div>
                  <h2 className="template-full-name">{t.name}</h2>
                  <p className="template-full-desc">{t.description}</p>

                  <ul className="template-feature-list">
                    <li><FiCheck size={13} /> Professional layout</li>
                    <li><FiCheck size={13} /> ATS-compliant structure</li>
                    <li><FiCheck size={13} /> Clean typography</li>
                    <li><FiCheck size={13} /> PDF-ready output</li>
                  </ul>

                  <div className="template-full-actions">
                    <Link
                      to={`/builder?template=${t.id}`}
                      className="btn btn-primary"
                      onClick={() => updateTemplate(t.id)}
                      id={`use-template-${t.id}`}
                    >
                      Use Template <FiArrowRight size={16} />
                    </Link>
                    <Link
                      to={`/builder?template=${t.id}`}
                      className="btn btn-outline btn-sm"
                      id={`preview-template-${t.id}`}
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="templates-cta">
        <div className="container text-center">
          <h2 className="section-title" style={{ color: 'white' }}>
            Not Sure Which to Pick?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: 'var(--text-lg)' }}>
            Start with any template — you can switch anytime in the builder without losing your data.
          </p>
          <Link to="/builder" className="btn btn-white btn-lg" id="templates-cta-btn">
            Start Building Free <FiArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
