/**
 * Menu item card used in restaurant details.
 */
import React from 'react';
import { useCart } from '../hooks/useCart';
import { money } from '../utils/format';
import './menu.css';

// PUBLIC_INTERFACE
export default function MenuItemCard({ item, restaurantId }) {
  /** Renders menu item with add/remove to cart */
  const { add, remove, items } = useCart();
  const inCart = items.find((i) => i.id === item.id);
  return (
    <div className="menu-card">
      <div className="info">
        <h4 className="name">{item.name}</h4>
        <p className="desc">{item.desc}</p>
        <div className="price">{money(item.price)}</div>
      </div>
      <div className="actions">
        {inCart ? (
          <>
            <button className="pill secondary" onClick={() => remove(item.id)} aria-label="Decrease">−</button>
            <span className="qty">{inCart.qty}</span>
            <button
              className="pill primary"
              onClick={() => add({ ...item, restaurantId })}
              aria-label="Increase"
            >
              +
            </button>
          </>
        ) : (
          <button
            className="btn primary"
            onClick={() => add({ ...item, restaurantId })}
            aria-label="Add to cart"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
