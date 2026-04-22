import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiSend, FiCheck, FiMapPin, FiClock, FiHeart } from 'react-icons/fi';


const team = [
  { name: 'Rahul Verma', role: 'Founder & CEO', initials: 'RV', color: '#2563EB' },
  { name: 'Ananya Patel', role: 'Lead Designer', initials: 'AP', color: '#7C3AED' },
  { name: 'Karan Joshi', role: 'Full Stack Developer', initials: 'KJ', color: '#0EA5E9' },
  { name: 'Priya Nair', role: 'Career Advisor', initials: 'PN', color: '#10B981' },
];

const faqs = [
  {
    q: 'Is ResumeAI really free?',
    a: 'Yes, 100% free. No hidden fees, no watermarks, no credit card required. We believe everyone deserves a professional resume.',
  },
  {
    q: 'Are the templates ATS-friendly?',
    a: 'All our templates are built specifically to pass Applicant Tracking Systems. We avoid tables, graphics, and formatting that confuses ATS parsers.',
  },
  {
    q: 'Can I edit my resume later?',
    a: 'Your resume is auto-saved to your browser. Create an account to save resumes to the cloud and access them from any device.',
  },
  {
    q: 'How does the AI suggestion feature work?',
    a: 'Our AI analyzes thousands of successful resumes and job descriptions to suggest optimized summaries, skills, and project descriptions tailored to your field.',
  },
  {
    q: 'Can I download my resume as PDF?',
    a: 'Yes! Click "Download PDF" in the builder to get a high-quality, print-ready PDF of your resume instantly.',
  },
];

export default function About() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="container text-center">
          <span className="section-label">About ResumeAI</span>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            We Help People Land<br />
            <span className="text-gradient">Their Dream Jobs</span>
          </h1>
          <div className="divider" />
          <p className="section-subtitle" style={{ maxWidth: 600, margin: '0 auto' }}>
            ResumeAI was built with one mission: make professional resume building accessible to everyone, for free. No paywalls. No subscriptions. Just results.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content animate-fade-left">
              <span className="section-label">Our Mission</span>
              <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>
                Democratizing Career Opportunities
              </h2>
              <p className="mission-text">
                We started ResumeAI because we saw talented people miss out on opportunities simply because they couldn't afford expensive resume writers or tools. A well-crafted resume shouldn't be a privilege.
              </p>
              <p className="mission-text">
                Our platform gives job seekers — from freshers to experienced professionals — the same tools that career coaches use, completely free of charge.
              </p>
              <div className="mission-stats">
                <div className="mission-stat">
                  <span className="mission-stat-num">50K+</span>
                  <span className="mission-stat-label">Resumes Created</span>
                </div>
                <div className="mission-stat">
                  <span className="mission-stat-num">92%</span>
                  <span className="mission-stat-label">Interview Rate</span>
                </div>
                <div className="mission-stat">
                  <span className="mission-stat-num">4.9★</span>
                  <span className="mission-stat-label">User Rating</span>
                </div>
              </div>
            </div>
            <div className="mission-visual animate-fade-right">
              <div className="mission-card">
                <FiHeart size={32} className="mission-icon" />
                <h3>Built with love</h3>
                <p>Every feature is designed with job seekers in mind — from ATS optimization to instant PDF downloads.</p>
              </div>
              <div className="mission-card mission-card-sm">
                <FiCheck size={20} className="mission-icon-sm" />
                <p>Free forever. No credit card.</p>
              </div>
              <div className="mission-card mission-card-sm" style={{ marginLeft: '2rem' }}>
                <FiMapPin size={20} className="mission-icon-sm" />
                <p>Used globally across 50+ countries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Meet the People Behind ResumeAI</h2>
            <div className="divider" />
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card" id={`team-${member.name.split(' ')[0].toLowerCase()}`}>
                <div className="team-avatar" style={{ background: member.color }}>
                  {member.initials}
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="divider" />
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                id={`faq-${i}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-arrow">{openFaq === i ? '▲' : '▼'}</span>
                </button>
                {openFaq === i && (
                  <div className="faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section contact-section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info">
              <span className="section-label">Get in Touch</span>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0.5rem 0 1rem' }}>
                We'd Love to Hear From You
              </h2>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Have a question, suggestion, or want to collaborate? Send us a message and we'll get back to you within 24 hours.
              </p>
              <div className="contact-details">
                <div className="contact-detail">
                  <FiMail size={18} className="contact-icon" />
                  <div>
                    <p className="contact-detail-label">Email</p>
                    <a href="mailto:hello@resumeai.com" className="contact-detail-value">hello@resumeai.com</a>
                  </div>
                </div>
                <div className="contact-detail">
                  <FiMapPin size={18} className="contact-icon" />
                  <div>
                    <p className="contact-detail-label">Location</p>
                    <p className="contact-detail-value">Bangalore, India</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <FiClock size={18} className="contact-icon" />
                  <div>
                    <p className="contact-detail-label">Response Time</p>
                    <p className="contact-detail-value">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-card">
              {sent ? (
                <div className="contact-success">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. We'll reply within 24 hours.</p>
                  <button className="btn btn-outline btn-sm" onClick={() => setSent(false)}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact-form">
                  <h3 className="contact-form-title">Send us a message</h3>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input className="form-input" placeholder="John Doe"
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        id="contact-name" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" placeholder="you@example.com"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        id="contact-email" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-input" rows={5} placeholder="Your message..."
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      id="contact-message" required />
                  </div>
                  <button type="submit" className="btn btn-primary" id="contact-submit-btn">
                    <FiSend size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section text-center">
        <div className="container">
          <h2 className="section-title">Ready to Build Your Free Resume?</h2>
          <p className="section-subtitle">Join 50,000+ professionals who use ResumeAI to get hired.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/builder" className="btn btn-primary btn-lg" id="about-cta-btn">
              Create Resume Free
            </Link>
            <Link to="/templates" className="btn btn-outline btn-lg" id="about-templates-btn">
              View Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
