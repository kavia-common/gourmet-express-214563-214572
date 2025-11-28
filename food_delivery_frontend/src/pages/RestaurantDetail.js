/**
 * Restaurant details with menu.
 */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';
import MenuItemCard from '../components/MenuItemCard';
import CartSidebar from '../components/CartSidebar';
import '../components/menu.css';
import '../components/cart.css';
import '../styles/pages.css';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';

// PUBLIC_INTERFACE
export default function RestaurantDetail() {
  /** Renders menu for a selected restaurant with cart and checkout */
  const { id } = useParams();
  const { menu, loading, error } = useMenu(id);
  const { items } = useCart();
  const { submitOrder } = useOrders();
  const navigate = useNavigate();

  const onCheckout = async () => {
    const payload = { restaurantId: id, items };
    const order = await submitOrder(payload);
    navigate(`/orders/${order.id}`);
  };

  return (
    <main className="ge-container ge-page two-col">
      <section>
        <h2>Menu</h2>
        {loading && <div className="skeleton-grid">{[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}</div>}
        {error && <div className="error">Failed to load menu.</div>}
        <div className="menu-grid">
          {menu.map((m) => <MenuItemCard key={m.id} item={m} restaurantId={id} />)}
        </div>
      </section>
      <aside>
        <CartSidebar onCheckout={onCheckout} />
      </aside>
    </main>
  );
}
