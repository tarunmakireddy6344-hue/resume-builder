import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowLeft, FiFileText } from 'react-icons/fi';
import './Auth.css';

export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate auth (replace with real Firebase in production)
    await new Promise((r) => setTimeout(r, 1200));

    if (!form.email || !form.password) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    const userData = {
      name: form.name || form.email.split('@')[0],
      email: form.email,
      uid: `user_${Date.now()}`,
    };

    login(userData);
    navigate('/builder');
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login({ name: 'Google User', email: 'user@gmail.com', uid: 'google_user' });
    navigate('/builder');
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <Link to="/" className="auth-back-btn">
            <FiArrowLeft size={16} /> Back to home
          </Link>

          <div className="auth-brand">
            <div className="logo-icon">
              <FiFileText size={20} />
            </div>
            <span className="auth-brand-name">ResumeAI</span>
          </div>

          <h1 className="auth-left-title">
            Build resumes that<br />
            <span className="text-gradient">get you hired.</span>
          </h1>

          <ul className="auth-benefits">
            {[
              'ATS-optimized templates',
              'Live preview as you type',
              'AI-powered suggestions',
              'Free PDF downloads — forever',
            ].map((b) => (
              <li key={b} className="auth-benefit-item">
                <span className="benefit-dot">✓</span>
                {b}
              </li>
            ))}
          </ul>

          <div className="auth-left-stat">
            <span className="auth-stat-number">50,000+</span>
            <span className="auth-stat-label">professionals hired with ResumeAI</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          {/* Tab Toggle */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setError(''); }}
              id="login-tab"
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); setError(''); }}
              id="signup-tab"
            >
              Create Account
            </button>
          </div>

          <h2 className="auth-form-title">
            {mode === 'login' ? 'Welcome back! 👋' : 'Get started for free! 🚀'}
          </h2>
          <p className="auth-form-sub">
            {mode === 'login'
              ? 'Sign in to access your saved resumes.'
              : 'Create your free account and start building.'}
          </p>

          {/* Google Button */}
          <button className="google-btn" onClick={handleGoogle} id="google-auth-btn" disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="auth-or">
            <span />
            <p>or continue with email</p>
            <span />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} id="auth-form">
            {mode === 'signup' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="auth-input-wrapper">
                  <FiUser size={16} className="auth-input-icon" />
                  <input
                    className="form-input auth-input"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    id="auth-name"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email address *</label>
              <div className="auth-input-wrapper">
                <FiMail size={16} className="auth-input-icon" />
                <input
                  className="form-input auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  id="auth-email"
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password *</label>
                {mode === 'login' && (
                  <a href="#" className="auth-forgot" id="forgot-password-link">Forgot password?</a>
                )}
              </div>
              <div className="auth-input-wrapper">
                <FiLock size={16} className="auth-input-icon" />
                <input
                  className="form-input auth-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  id="auth-password"
                />
                <button
                  type="button"
                  className="auth-pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {error && <div className="auth-error" role="alert">{error}</div>}

            <button
              type="submit"
              className={`btn btn-primary auth-submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
              id="auth-submit-btn"
            >
              {loading ? (
                <span className="auth-loading-spinner" />
              ) : mode === 'login' ? 'Sign In to My Account' : 'Create Free Account'}
            </button>
          </form>

          <p className="auth-switch">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              className="auth-switch-link"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              id="auth-switch-btn"
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

          <p className="auth-terms">
            By continuing, you agree to our{' '}
            <Link to="/about">Terms of Service</Link> and{' '}
            <Link to="/about">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
