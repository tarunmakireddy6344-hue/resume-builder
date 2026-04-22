import { Link } from 'react-router-dom';
import { FiFileText, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <FiFileText size={18} />
              </div>
              <span>ResumeAI</span>
            </Link>
            <p className="footer-tagline">
              Build professional, ATS-friendly resumes for free. Land your dream job faster.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Twitter" id="footer-twitter">
                <FiTwitter size={16} />
              </a>
              <a href="#" className="social-btn" aria-label="LinkedIn" id="footer-linkedin">
                <FiLinkedin size={16} />
              </a>
              <a href="#" className="social-btn" aria-label="GitHub" id="footer-github">
                <FiGithub size={16} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="footer-col">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li><Link to="/builder">Resume Builder</Link></li>
              <li><Link to="/templates">Templates</Link></li>
              <li><Link to="/builder">Cover Letter</Link></li>
              <li><Link to="/builder">CV Builder</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/about">Resume Tips</Link></li>
              <li><Link to="/about">ATS Guide</Link></li>
              <li><Link to="/about">Career Blog</Link></li>
              <li><Link to="/about">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/about">Contact</Link></li>
              <li><Link to="/about">Privacy Policy</Link></li>
              <li><Link to="/about">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved. 100% Free forever.</p>
          <div className="footer-badges">
            <span className="badge badge-success">✓ Free Forever</span>
            <span className="badge badge-primary">ATS-Friendly</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
