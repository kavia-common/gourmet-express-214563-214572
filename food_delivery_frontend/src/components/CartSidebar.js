/**
 * Cart view used in page and as a sidebar component.
 */
import React from 'react';
import { useCart } from '../hooks/useCart';
import { money } from '../utils/format';
import './cart.css';

// PUBLIC_INTERFACE
export default function CartSidebar({ onCheckout }) {
  /** Renders cart list and totals, calls onCheckout when provided */
  const { items, remove, add, clear, totals } = useCart();

  return (
    <aside className="cart">
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button className="link" onClick={clear} disabled={!items.length}>Clear</button>
      </div>
      {items.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {items.map((i) => (
            <li key={i.id} className="cart-item">
              <div className="title">{i.name}</div>
              <div className="controls">
                <button className="pill" onClick={() => remove(i.id)} aria-label="Decrease">−</button>
                <span className="qty">{i.qty}</span>
                <button className="pill" onClick={() => add(i)} aria-label="Increase">+</button>
              </div>
              <div className="price">{money(i.price * i.qty)}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="totals">
        <div><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>
        <div><span>Delivery</span><span>{money(totals.delivery)}</span></div>
        <div><span>Tax</span><span>{money(totals.tax)}</span></div>
        <div className="total"><span>Total</span><span>{money(totals.total)}</span></div>
      </div>
      <button
        className="checkout-btn"
        onClick={onCheckout}
        disabled={!items.length}
      >
        Checkout
      </button>
    </aside>
  );
}
