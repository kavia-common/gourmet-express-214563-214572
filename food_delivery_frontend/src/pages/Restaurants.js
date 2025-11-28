/**
 * Restaurants listing page.
 */
import React from 'react';
import { useRestaurants } from '../hooks/useRestaurants';
import RestaurantCard from '../components/RestaurantCard';
import '../components/restaurant.css';
import '../styles/pages.css';

// PUBLIC_INTERFACE
export default function Restaurants() {
  /** Displays a grid of restaurants with loading and error states */
  const { restaurants, loading, error } = useRestaurants();

  return (
    <main className="ge-container ge-page">
      <h2>Popular Restaurants</h2>
      {loading && <div className="skeleton-grid" aria-busy="true">
        {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}
      </div>}
      {error && <div className="error">Failed to load restaurants. Showing nothing.</div>}
      <div className="rest-grid">
        {restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
      </div>
    </main>
  );
}
