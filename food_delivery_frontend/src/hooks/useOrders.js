/**
 * Hook to create and track orders.
 */
import { useEffect, useState } from 'react';
import { createOrder, fetchOrderStatus } from '../api/endpoints';
import { useAppDispatch, useAppState } from '../context/AppContext';

// PUBLIC_INTERFACE
export function useOrders() {
  /** Returns helpers to submit and poll order status */
  const { order } = useAppState();
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);

  async function submitOrder(payload) {
    try {
      const res = await createOrder(payload);
      dispatch({ type: 'SET_ORDER', value: { currentOrderId: res.id, status: res.status } });
      return res;
    } catch (e) {
      setError(e);
      throw e;
    }
  }

  useEffect(() => {
    if (!order.currentOrderId) return;
    let timer;
    let active = true;

    const poll = async () => {
      try {
        const s = await fetchOrderStatus(order.currentOrderId);
        if (!active) return;
        dispatch({ type: 'SET_ORDER', value: { status: s.status } });
      } catch (e) {
        // Ignore polling errors to be resilient
      } finally {
        if (active) timer = setTimeout(poll, 5000);
      }
    };
    poll();

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [order.currentOrderId, dispatch]);

  return { order, submitOrder, error };
}
