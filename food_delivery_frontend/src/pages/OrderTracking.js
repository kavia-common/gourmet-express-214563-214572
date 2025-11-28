/**
 * Order tracking page
 */
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { useWebSocket, usePolling } from '../hooks/useWebSocket';
import { fetchOrderStatus } from '../api/endpoints';
import { useAppDispatch } from '../context/AppContext';
import '../styles/pages.css';

// PUBLIC_INTERFACE
export default function OrderTracking() {
  /** Shows order status and updates as it changes via WebSocket if available, otherwise polling */
  const { id } = useParams();
  const { order } = useOrders();
  const dispatch = useAppDispatch();

  // Setup WebSocket subscription if REACT_APP_WS_URL exists.
  const { ready, wsUrl } = useWebSocket(`/orders/${id}`, {
    onMessage: (data) => {
      try {
        const parsed = JSON.parse(data);
        if (parsed && parsed.status) {
          dispatch({ type: 'SET_ORDER', value: { currentOrderId: id, status: parsed.status } });
        }
      } catch {
        // Non-JSON or malformed payloads are ignored
      }
    },
  });

  // Polling fallback: if no WS URL configured or WS isn't ready, poll REST endpoint.
  const pollFn = useCallback(async () => {
    const res = await fetchOrderStatus(id);
    if (res && res.status) {
      dispatch({ type: 'SET_ORDER', value: { currentOrderId: id, status: res.status } });
    }
  }, [dispatch, id]);

  // Use polling only when ws not configured or not ready.
  usePolling(pollFn, 5000, { enabled: !wsUrl || !ready });

  // Ensure we have initial state on mount.
  useEffect(() => {
    if (!order.status) {
      pollFn().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const steps = ['received', 'preparing', 'on_the_way', 'delivered'];
  const currentIdx = steps.indexOf(order.status || 'received');

  return (
    <main className="ge-container ge-page">
      <h2>Order #{id}</h2>
      <p className="muted">
        {wsUrl ? (ready ? 'Connected to live updates.' : 'Connecting to live updates...') : 'Using periodic updates.'}
      </p>
      <div className="progress">
        {steps.map((s, i) => (
          <div key={s} className={`step ${i <= currentIdx ? 'active' : ''}`}>
            <span className="dot" />
            <span className="label">{s.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
      <div className="status-card">
        <strong>Status:</strong>{' '}
        <span className="badge">{(order.status || 'received').replace('_', ' ')}</span>
      </div>
    </main>
  );
}
