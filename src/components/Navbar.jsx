import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Builder', path: '/builder' },
  { label: 'Templates', path: '/templates' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">ResumeAI</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="profile-menu">
              <button
                className="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                id="profile-btn"
              >
                <div className="avatar">
                  {user.name ? user.name[0].toUpperCase() : <FiUser size={16} />}
                </div>
                <span className="avatar-name">{user.name?.split(' ')[0]}</span>
              </button>
              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <p className="profile-name">{user.name}</p>
                    <p className="profile-email">{user.email}</p>
                  </div>
                  <hr />
                  <button
                    className="dropdown-item"
                    onClick={() => { logout(); setProfileOpen(false); }}
                    id="logout-btn"
                  >
                    <FiLogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth" className="btn btn-ghost btn-sm" id="nav-signin-btn">Sign In</Link>
              <Link to="/builder" className="btn btn-primary btn-sm" id="nav-cta-btn">
                Create Resume
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="hamburger-btn"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-actions">
            {isAuthenticated ? (
              <button className="btn btn-ghost btn-sm" onClick={() => { logout(); setMenuOpen(false); }}>
                Sign Out
              </button>
            ) : (
              <>
                <Link to="/auth" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>Sign In</Link>
                <Link to="/builder" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                  Create Resume
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
