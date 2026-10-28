import React from 'react';
import { useSelector } from 'react-redux';

export default function Navbar({ page, onNavigate }) {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => onNavigate('home')} aria-label="Paradise Nursery home">
          <span className="brand-symbol" aria-hidden="true">✳</span>
          <span>paradise<span className="brand-accent">nursery</span></span>
        </button>
        <nav className="nav-links" aria-label="Main navigation">
          <button className={page === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>Home</button>
          <button className={page === 'plants' ? 'active' : ''} onClick={() => onNavigate('plants')}>Plants</button>
          <button className={`cart-nav ${page === 'cart' ? 'active' : ''}`} onClick={() => onNavigate('cart')} aria-label={`Cart with ${totalItems} items`}>
            <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/>
            </svg>
            <span>Cart</span>
            <span className="cart-count" aria-live="polite">{totalItems}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
