/**
 * App Footer
 */
import React from 'react';
import './layout.css';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Renders footer */
  return (
    <footer className="ge-footer">
      <div className="ge-container ge-footer-inner">
        <p>© {new Date().getFullYear()} GourmetExpress · Crafted with Ocean Professional theme</p>
        <div className="links">
          <a href="https://react.dev" target="_blank" rel="noreferrer">React</a>
          <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">MDN</a>
        </div>
      </div>
    </footer>
  );
}
