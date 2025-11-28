/**
 * Hook for cart operations and totals.
 */
import { useMemo } from 'react';
import { useAppDispatch, useAppState } from '../context/AppContext';

// PUBLIC_INTERFACE
export function useCart() {
  /** Provides cart items, totals, and mutators */
  const { cart } = useAppState();
  const dispatch = useAppDispatch();

  const add = (item) => dispatch({ type: 'ADD_TO_CART', item });
  const remove = (id) => dispatch({ type: 'REMOVE_FROM_CART', id });
  const clear = () => dispatch({ type: 'CLEAR_CART' });

  const totals = useMemo(() => {
    const subtotal = cart.items.reduce((acc, it) => acc + it.price * it.qty, 0);
    const delivery = cart.items.length ? 3.99 : 0;
    const tax = subtotal * 0.07;
    const total = subtotal + delivery + tax;
    return {
      count: cart.items.reduce((a, i) => a + i.qty, 0),
      subtotal,
      delivery,
      tax,
      total
    };
  }, [cart.items]);

  return { items: cart.items, add, remove, clear, totals };
}
