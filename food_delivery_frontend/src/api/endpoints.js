/**
 * API endpoints for the food delivery app with mock fallbacks.
 */
import { apiGet, apiPost } from './client';

const MOCK_RESTAURANTS = [
  { id: 'r1', name: 'Blue Ocean Sushi', rating: 4.7, cuisine: 'Japanese', eta: '25-35', cover: '', priceLevel: '$$' },
  { id: 'r2', name: 'Amber Grill House', rating: 4.5, cuisine: 'BBQ', eta: '30-40', cover: '', priceLevel: '$$$' },
  { id: 'r3', name: 'Seaside Salads', rating: 4.3, cuisine: 'Healthy', eta: '20-30', cover: '', priceLevel: '$' }
];

const MOCK_MENUS = {
  r1: [
    { id: 'm1', name: 'Salmon Nigiri', price: 8.5, desc: 'Fresh salmon over rice', image: '' },
    { id: 'm2', name: 'Tuna Roll', price: 7, desc: 'Classic tuna roll', image: '' }
  ],
  r2: [
    { id: 'm3', name: 'Grilled Ribs', price: 16, desc: 'Smoky BBQ ribs', image: '' },
    { id: 'm4', name: 'Chicken Wings', price: 12, desc: 'Spicy and crispy', image: '' }
  ],
  r3: [
    { id: 'm5', name: 'Kale Caesar', price: 9, desc: 'Crisp kale and parmesan', image: '' },
    { id: 'm6', name: 'Mediterranean Bowl', price: 11, desc: 'Quinoa, chickpeas, feta', image: '' }
  ]
};

// PUBLIC_INTERFACE
export async function fetchRestaurants() {
  /** Fetches restaurant list with mock fallback */
  return apiGet('/restaurants', MOCK_RESTAURANTS);
}

// PUBLIC_INTERFACE
export async function fetchMenu(restaurantId) {
  /** Fetches menu for a restaurant with mock fallback */
  return apiGet(`/restaurants/${restaurantId}/menu`, MOCK_MENUS[restaurantId] || []);
}

// PUBLIC_INTERFACE
export async function createOrder(payload) {
  /** Creates an order (mock confirming) */
  const fallback = { id: `ord_${Date.now()}`, status: 'received', ...payload };
  return apiPost('/orders', payload, fallback);
}

// PUBLIC_INTERFACE
export async function fetchOrderStatus(orderId) {
  /** Fetches order status with mock fallback of progressing */
  const steps = ['received', 'preparing', 'on_the_way', 'delivered'];
  const idx = Math.min(steps.length - 1, Math.floor((Date.now() / 10000) % steps.length));
  const fallback = { id: orderId, status: steps[idx] };
  return apiGet(`/orders/${orderId}/status`, fallback);
}
