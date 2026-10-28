import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import Navbar from './Navbar.jsx';

export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const changeQuantity = (item, delta) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + delta }));
  };

  return (
    <>
      <Navbar page="cart" onNavigate={onNavigate} />
      <main className="cart-page">
        <div className="cart-heading">
          <div>
            <span className="eyebrow">Your little green collection</span>
            <h1>Shopping <em>cart.</em></h1>
          </div>
          <span className="cart-items-pill">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="cart-layout">
          <section className="cart-list" aria-label="Shopping cart items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <span aria-hidden="true">🌿</span>
                <h2>Your cart is waiting to bloom.</h2>
                <p>Discover something leafy to take home.</p>
                <button className="primary-button" onClick={() => onNavigate('plants')}>Explore plants</button>
              </div>
            ) : (
              cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-thumb"><img src={item.image} alt={item.name} /></div>
                  <div className="cart-item-details">
                    <h2>{item.name}</h2>
                    <p>Unit price: ${item.price.toFixed(2)}</p>
                    <button className="remove-button" onClick={() => dispatch(removeItem(item.id))}>Remove item</button>
                  </div>
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button aria-label={`Decrease ${item.name} quantity`} onClick={() => changeQuantity(item, -1)}>−</button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button aria-label={`Increase ${item.name} quantity`} onClick={() => changeQuantity(item, 1)}>+</button>
                  </div>
                  <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
                </article>
              ))
            )}
          </section>

          <aside className="order-summary">
            <span className="eyebrow">Almost there</span>
            <h2>Order summary</h2>
            <div className="summary-row"><span>Items</span><span>{totalItems}</span></div>
            <div className="summary-row"><span>Subtotal</span><span>${totalAmount.toFixed(2)}</span></div>
            <div className="summary-row summary-total"><strong>Total cart amount</strong><strong>${totalAmount.toFixed(2)}</strong></div>
            <button className="checkout-button" onClick={() => window.alert('Coming Soon! Checkout is not available yet.')} disabled={cartItems.length === 0}>Checkout</button>
            <button className="continue-button" onClick={() => onNavigate('plants')}>← Continue shopping</button>
            <p className="summary-note">Happy plants, happy spaces. 🌱</p>
          </aside>
        </div>
      </main>
    </>
  );
}
