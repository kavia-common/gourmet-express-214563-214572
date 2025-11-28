/**
 * Order tracking page
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import '../styles/pages.css';

// PUBLIC_INTERFACE
export default function OrderTracking() {
  /** Shows order status and updates as it changes */
  const { id } = useParams();
  const { order } = useOrders();

  const steps = ['received', 'preparing', 'on_the_way', 'delivered'];
  const currentIdx = steps.indexOf(order.status || 'received');

  return (
    <main className="ge-container ge-page">
      <h2>Order #{id}</h2>
      <p className="muted">Real-time status updates will appear below.</p>
      <div className="progress">
        {steps.map((s, i) => (
          <div key={s} className={`step ${i <= currentIdx ? 'active' : ''}`}>
            <span className="dot" />
            <span className="label">{s.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
      <div className="status-card">
        <strong>Status:</strong> <span className="badge">{(order.status || 'received').replace('_', ' ')}</span>
      </div>
    </main>
  );
}
