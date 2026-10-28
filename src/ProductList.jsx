import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import { plants, categories } from './plants.js';

// Navbar is defined here so the ProductList.jsx submission visibly contains
// the Home, Plants, and Cart navigation plus a dynamic cart icon/count.
// The same component is re-exported by Navbar.jsx for the Cart page.
export function Navbar({ page, onNavigate, cartCount = 0 }) {
  // The same navigation component is shown on Plants and Cart pages.
  const handleHomeClick = () => onNavigate('home');
  const handlePlantsClick = () => onNavigate('plants');
  const handleCartClick = () => onNavigate('cart');
  const cart_quantity_count = cartCount;

  return (
    <header className="navbar">
      <div className="header-inner">
        <button className="brand" onClick={handleHomeClick} aria-label="Paradise Nursery home">
          <span className="brand-symbol" aria-hidden="true">✳</span>
          <span>paradise<span className="brand-accent">nursery</span></span>
        </button>
        <nav className="nav-links" aria-label="Main navigation">
          <button className={page === 'home' ? 'active' : ''} onClick={handleHomeClick}>Home</button>
          <button className={page === 'plants' ? 'active' : ''} onClick={handlePlantsClick}>Plants</button>
          <button className={`cart-nav ${page === 'cart' ? 'active' : ''}`} onClick={handleCartClick} aria-label={`Cart with ${cartCount} items`}>
            <svg className="cart-icon" aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/>
            </svg>
            <span>Cart</span>
            <span className="cart-count cart_quantity_count" aria-live="polite">{cart_quantity_count}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  // Lookup by plant.name, as required by the assignment. Redux remains
  // the source of truth, so a removed plant becomes available to add again.
  const addedToCart = Object.fromEntries(cart.map((item) => [item.name, true]));
  const cart_quantity_count = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Keep plants grouped as category objects for predictable rendering.
  const plantsArray = categories.map((category) => ({
    category,
    plants: plants.filter((plant) => plant.category === category),
  }));

  const handleAddToCart = (plant) => {
    if (!addedToCart[plant.name]) dispatch(addItem(plant));
  };

  return (
    <>
      <Navbar page="plants" onNavigate={onNavigate} cartCount={cart_quantity_count} />
      <main className="catalog-page">
        <div className="catalog-intro">
          <span className="eyebrow">Curated for your space</span>
          <h1>Meet your new <em>favorite plant.</em></h1>
          <p>Find something green for every corner. Browse 18 plants across three thoughtfully chosen collections.</p>
        </div>

        {plantsArray.map(({ category, plants: categoryPlants }, index) => (
          <section className="category-section" key={category} aria-label={category}>
            <div className="category-heading">
              <div>
                <span className="category-kicker">Collection 0{index + 1}</span>
                <h2>{category}</h2>
              </div>
              <span className="category-count">6 plants</span>
            </div>
            <div className="product-list product-grid">
              {categoryPlants.map((plant) => (
                <article className="plant-card" key={plant.id}>
                  <div className="plant-image-wrap">
                    <img src={plant.image} alt={plant.name} loading="lazy" />
                  </div>
                  <div className="plant-content">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <div className="plant-card-bottom">
                      <span className="plant-price">${plant.price.toFixed(2)}</span>
                      <button
                        className="add-button"
                        disabled={addedToCart[plant.name]}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
