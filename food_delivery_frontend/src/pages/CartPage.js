/**
 * Cart page
 */
import React from 'react';
import CartSidebar from '../components/CartSidebar';
import '../components/cart.css';
import '../styles/pages.css';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function CartPage() {
  /** Renders cart as a page and allows checkout */
  const { items } = useCart();
  const { submitOrder } = useOrders();
  const navigate = useNavigate();

  const onCheckout = async () => {
    if (!items.length) return;
    const payload = { restaurantId: items[0]?.restaurantId || 'misc', items };
    const order = await submitOrder(payload);
    navigate(`/orders/${order.id}`);
  };

  return (
    <main className="ge-container ge-page">
      <h2>Your Cart</h2>
      {!items.length && <p className="muted">Add some items from a restaurant to proceed to checkout.</p>}
      <CartSidebar onCheckout={onCheckout} />
    </main>
  );
}
