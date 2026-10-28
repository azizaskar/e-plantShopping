import React from 'react';
import { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="app-shell">
      {page === 'home' && (
        <main className="landing-page">
          <div className="landing-overlay" />
          <div className="landing-inner">
            <div className="landing-copy">
              <div className="landing-logo"><span>✳</span> paradise<span>nursery</span></div>
              <span className="landing-kicker">NATURE, DELIVERED TO YOUR DOOR</span>
              <h1>Welcome to <em>Paradise Nursery.</em></h1>
              <p className="landing-subtitle">A greener home begins with one little plant.</p>
              <button className="primary-button hero-cta" onClick={() => setPage('plants')}>
                Get Started <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div className="landing-about"><AboutUs /></div>
          </div>
          <div className="landing-footer">ROOTED IN JOY · GROWN WITH CARE</div>
        </main>
      )}
      {page === 'plants' && <ProductList onNavigate={setPage} />}
      {page === 'cart' && <CartItem onNavigate={setPage} />}
    </div>
  );
}
