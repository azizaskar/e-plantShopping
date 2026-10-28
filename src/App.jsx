import React from 'react';
import { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  // The coursework explicitly asks for showProductList to become true when
  // a visitor clicks Get Started. Keep it in sync with navigation.
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
    setPage('plants');
  };

  const handleNavigation = (destination) => {
    setPage(destination);
    setShowProductList(destination === 'plants');
  };

  return (
    <div className="app-shell">
      {page === 'home' && (
        <main className="landing-page background-image">
          <div className="landing-overlay" />
          <div className="landing-inner">
            <div className="landing-copy">
              <div className="landing-logo"><span>✳</span> paradise<span>nursery</span></div>
              <span className="landing-kicker">NATURE, DELIVERED TO YOUR DOOR</span>
              <h1>Welcome to <em>Paradise Nursery.</em></h1>
              <p className="landing-subtitle">A greener home begins with one little plant.</p>
              <button className="primary-button hero-cta" onClick={handleGetStarted}>
                Get Started <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div className="landing-about"><AboutUs /></div>
          </div>
          <div className="landing-footer">ROOTED IN JOY · GROWN WITH CARE</div>
        </main>
      )}
      {showProductList && page === 'plants' && <ProductList onNavigate={handleNavigation} />}
      {page === 'cart' && <CartItem onNavigate={handleNavigation} />}
    </div>
  );
}
