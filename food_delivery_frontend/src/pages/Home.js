/**
 * Home page with hero section.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages.css';

// PUBLIC_INTERFACE
export default function Home() {
  /** Renders hero and CTA */
  return (
    <main className="ge-container ge-page">
      <section className="hero">
        <div className="hero-card">
          <h1>Delicious meals, delivered fast.</h1>
          <p>Discover top-rated restaurants around you with a clean, modern experience.</p>
          <div className="actions">
            <Link to="/restaurants" className="cta primary">Browse Restaurants</Link>
            <Link to="/cart" className="cta">View Cart</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
