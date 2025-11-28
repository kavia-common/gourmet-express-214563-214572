import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './App.css';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import CartPage from './pages/CartPage';
import OrderTracking from './pages/OrderTracking';

// PUBLIC_INTERFACE
function App() {
  /** Application root: provides context, theme, and routes */
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App" style={{ background: 'var(--color-bg)' }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders/:id" element={<OrderTracking />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
