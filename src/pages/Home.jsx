import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiStar, FiDownload, FiEye, FiZap, FiShield, FiLayers, FiClock, FiPlus, FiUploadCloud } from 'react-icons/fi';
import { TEMPLATES } from '../templates';


const features = [
  {
    icon: <FiZap size={22} />,
    title: 'AI-Powered Suggestions',
    desc: 'Get smart recommendations for your summary, skills, and project descriptions with a single click.',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
  {
    icon: <FiEye size={22} />,
    title: 'Live Preview',
    desc: 'See your resume update in real time as you type — no need to refresh or wait.',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    icon: <FiDownload size={22} />,
    title: 'Instant PDF Download',
    desc: 'Download a high-quality, ATS-ready PDF resume in seconds. No watermarks, ever.',
    color: '#0EA5E9',
    bg: '#E0F2FE',
  },
  {
    icon: <FiLayers size={22} />,
    title: '4 Premium Templates',
    desc: 'Choose from Modern, Classic, Minimal, and Creative — all designed to pass ATS filters.',
    color: '#10B981',
    bg: '#D1FAE5',
  },
  {
    icon: <FiShield size={22} />,
    title: 'ATS-Friendly Formats',
    desc: 'All templates are optimized for Applicant Tracking Systems so recruiters actually see your resume.',
    color: '#F59E0B',
    bg: '#FEF3C7',
  },
  {
    icon: <FiClock size={22} />,
    title: 'Auto-Save',
    desc: 'Your progress is automatically saved locally. Never lose your work again.',
    color: '#EF4444',
    bg: '#FEE2E2',
  },
];

const steps = [
  { num: '01', title: 'Fill Your Details', desc: 'Enter your personal info, education, work experience, skills, and projects using our step-by-step form.' },
  { num: '02', title: 'Pick a Template', desc: 'Select from 4 beautiful, ATS-friendly resume templates designed by career experts.' },
  { num: '03', title: 'Download & Apply', desc: 'Preview your resume live, then download it as a polished PDF and start applying immediately.' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    text: 'I landed interviews at 5 FAANG companies using this resume builder. The ATS-friendly templates made all the difference. Highly recommend!',
    stars: 5,
    avatar: 'PS',
  },
  {
    name: 'Arjun Mehta',
    role: 'Product Manager at Flipkart',
    text: 'As a fresher, I had no idea how to write a resume. This tool guided me through everything and the AI suggestions were incredibly helpful.',
    stars: 5,
    avatar: 'AM',
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Data Analyst at Deloitte',
    text: 'The live preview feature is a game-changer. I could see exactly how my resume looked while editing. Got my dream job in 3 weeks!',
    stars: 5,
    avatar: 'SK',
  },
];

const stats = [
  { val: '50K+', label: 'Resumes Created' },
  { val: '92%', label: 'Interview Rate' },
  { val: '4', label: 'ATS Templates' },
  { val: '100%', label: 'Free Forever' },
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-grid-lines" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-up">
              <span className="hero-badge-dot" />
              100% Free · No Credit Card Required
            </div>
            <h1 className="hero-title animate-fade-up delay-100">
              Build Your Professional<br />
              <span className="text-gradient">Resume for Free</span>
            </h1>
            <p className="hero-subtitle animate-fade-up delay-200">
              Create ATS-friendly resumes in minutes with our AI-powered builder.
              Choose from premium templates, edit live, and download your perfect resume as PDF.
            </p>

            <div className="hero-entry-grid animate-fade-up delay-300">
              <Link to="/builder" className="hero-entry-card" id="home-scratch-card">
                <div className="hero-entry-icon scratch">
                  <FiPlus size={20} />
                </div>
                <div className="hero-entry-info">
                  <h4>Create New</h4>
                  <p>Start from scratch</p>
                </div>
              </Link>
              <Link to="/builder" className="hero-entry-card" id="home-upload-card">
                <div className="hero-entry-icon upload">
                  <FiUploadCloud size={20} />
                </div>
                <div className="hero-entry-info">
                  <h4>Import Data</h4>
                  <p>Upload old PDF</p>
                </div>
              </Link>
            </div>

            <div className="hero-cta animate-fade-up delay-400">
              <Link to="/builder" className="btn btn-primary btn-lg" id="hero-create-btn">
                Open Builder <FiArrowRight size={18} />
              </Link>
              <Link to="/templates" className="btn btn-outline btn-lg" id="hero-templates-btn">
                View Templates
              </Link>
            </div>
            
            <div className="hero-trust animate-fade-up delay-500">
              {['No signup required', 'ATS-optimized', 'Instant PDF download'].map((item) => (
                <span key={item} className="hero-trust-item">
                  <FiCheck size={14} /> {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero-visual animate-fade-right delay-200">
            <div className="hero-preview-card animate-float">
              <div className="hero-preview-header">
                <div className="preview-dots">
                  <span /><span /><span />
                </div>
                <span className="preview-label">Live Preview</span>
              </div>
              <div className="hero-resume-mock">
                <div className="mock-header-bar" />
                <div className="mock-name" />
                <div className="mock-title" />
                <div className="mock-contact-row">
                  <div className="mock-contact-chip" /><div className="mock-contact-chip" /><div className="mock-contact-chip" />
                </div>
                <div className="mock-section-title" />
                <div className="mock-divider" />
                <div className="mock-text-line" style={{ width: '100%' }} />
                <div className="mock-text-line" style={{ width: '88%' }} />
                <div className="mock-text-line" style={{ width: '75%' }} />
                <div className="mock-section-title" style={{ marginTop: 12 }} />
                <div className="mock-divider" />
                <div className="mock-exp-item">
                  <div className="mock-exp-left">
                    <div className="mock-text-line short" />
                    <div className="mock-text-line" style={{ width: '70%', height: 6 }} />
                  </div>
                  <div className="mock-date-pill" />
                </div>
                <div className="mock-exp-item">
                  <div className="mock-exp-left">
                    <div className="mock-text-line short" />
                    <div className="mock-text-line" style={{ width: '55%', height: 6 }} />
                  </div>
                  <div className="mock-date-pill" />
                </div>
                <div className="mock-skills-row">
                  {[80, 68, 92, 55, 75].map((w, i) => (
                    <div key={i} className="mock-skill-chip" style={{ width: `${w}px` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="float-badge float-badge-1">
              <FiCheck size={14} /> ATS Score: 98%
            </div>
            <div className="float-badge float-badge-2">
              <FiDownload size={14} /> PDF Ready
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.val} className="stat-item">
                <div className="stat-value">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Why Choose ResumeAI</p>
            <h2 className="section-title">Everything You Need to<br />Land Your Dream Job</h2>
            <div className="divider" />
            <p className="section-subtitle">No fluff. Just the tools that help you get hired faster.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card" id={`feature-card-${i}`}>
                <div className="feature-icon" style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="section templates-preview">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Resume Templates</p>
            <h2 className="section-title">Pick Your Perfect Template</h2>
            <div className="divider" />
            <p className="section-subtitle">4 professionally designed templates, all ATS-friendly and free.</p>
          </div>
          <div className="templates-grid">
            {TEMPLATES.map((t) => (
              <Link key={t.id} to={`/builder?template=${t.id}`} className="template-preview-card" id={`template-preview-${t.id}`}>
                <div className="template-preview-visual">
                  <img 
                    src={t.previewImage} 
                    alt={t.name} 
                    className="tp-preview-img"
                    loading="lazy"
                  />
                </div>
                <div className="template-preview-info">
                  <div className="template-preview-name">{t.name}</div>
                  <div className="template-preview-desc">{t.description}</div>
                  <span className={`badge badge-${t.badgeType}`}>{t.badge}</span>
                </div>
                <div className="template-hover-overlay">
                  <span className="btn btn-white btn-sm">Use This Template</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/templates" className="btn btn-outline btn-lg" id="view-all-templates-btn">
              Browse All Templates <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Simple Process</p>
            <h2 className="section-title">Get Your Resume Ready<br />in 3 Easy Steps</h2>
            <div className="divider" />
          </div>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step-card" id={`step-${i + 1}`}>
                <div className="step-num">{step.num}</div>
                {i < steps.length - 1 && <div className="step-connector" />}
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/builder" className="btn btn-primary btn-lg" id="get-started-btn">
              Get Started Free <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Success Stories</p>
            <h2 className="section-title">Loved by Job Seekers</h2>
            <div className="divider" />
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card" id={`testimonial-${i}`}>
                <div className="t-stars">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <FiStar key={j} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="t-text">"{t.text}"</p>
                <div className="t-author">
                  <div className="t-avatar">{t.avatar}</div>
                  <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Build Your Resume?</h2>
            <p className="cta-sub">Join thousands of professionals who landed their dream jobs with ResumeAI.</p>
            <div className="cta-actions">
              <Link to="/builder" className="btn btn-white btn-lg" id="cta-create-btn">
                Create Resume Free <FiArrowRight size={18} />
              </Link>
              <Link to="/templates" className="btn btn-lg" style={{ color: 'rgba(255,255,255,0.8)', border: '2px solid rgba(255,255,255,0.3)' }} id="cta-templates-btn">
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
