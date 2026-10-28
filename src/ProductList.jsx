import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import { plants, categories } from './plants.js';
import Navbar from './Navbar.jsx';

export default function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const inCart = new Set(cartItems.map((item) => item.id));

  return (
    <>
      <Navbar page="plants" onNavigate={onNavigate} />
      <main className="catalog-page">
        <div className="catalog-intro">
          <span className="eyebrow">Curated for your space</span>
          <h1>Meet your new <em>favorite plant.</em></h1>
          <p>Find something green for every corner. Browse 18 plants across three thoughtfully chosen collections.</p>
        </div>

        {categories.map((category, index) => (
          <section className="category-section" key={category} aria-label={category}>
            <div className="category-heading">
              <div>
                <span className="category-kicker">Collection 0{index + 1}</span>
                <h2>{category}</h2>
              </div>
              <span className="category-count">6 plants</span>
            </div>
            <div className="product-grid">
              {plants.filter((plant) => plant.category === category).map((plant) => {
                const added = inCart.has(plant.id);
                return (
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
                          disabled={added}
                          onClick={() => dispatch(addItem(plant))}
                        >
                          {added ? '✓ Added' : '+ Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
