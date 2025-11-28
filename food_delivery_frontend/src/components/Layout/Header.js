/**
 * App Header with navigation and theme toggle.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './layout.css';

// PUBLIC_INTERFACE
export default function Header() {
  /** Renders top navigation bar */
  const { theme, toggle } = useTheme();
  return (
    <header className="ge-header">
      <div className="ge-container ge-header-inner">
        <Link className="brand" to="/">
          <span className="brand-dot" /> GourmetExpress
        </Link>
        <nav className="ge-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/restaurants" className="nav-link">Restaurants</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
        </nav>
        <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
