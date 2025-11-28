/**
 * Restaurant card for listing grid.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './restaurant.css';

// PUBLIC_INTERFACE
export default function RestaurantCard({ restaurant }) {
  /** Renders a restaurant item card */
  const { id, name, rating, cuisine, eta, priceLevel } = restaurant;
  return (
    <Link to={`/restaurants/${id}`} className="rest-card" aria-label={`Open ${name}`}>
      <div className="cover" />
      <div className="body">
        <div className="title-row">
          <h3 className="title">{name}</h3>
          <div className="rating">⭐ {rating}</div>
        </div>
        <div className="meta">
          <span>{cuisine}</span>
          <span className="dot">•</span>
          <span>{priceLevel}</span>
          <span className="dot">•</span>
          <span>{eta} min</span>
        </div>
      </div>
    </Link>
  );
}
