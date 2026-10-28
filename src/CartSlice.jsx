import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add one unit of a plant, or create a new cart entry.
    addItem: (state, action) => {
      const plant = action.payload;
      const existing = state.items.find((item) => item.id === plant.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: plant.id,
          name: plant.name,
          price: plant.price,
          image: plant.image,
          quantity: 1,
        });
      }
    },

    // Delete the entire cart entry (regardless of its quantity).
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    // Set quantity explicitly. Quantity zero removes the entry.
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((plant) => plant.id === id);
      if (!item || !Number.isInteger(quantity)) return;
      if (quantity <= 0) {
        state.items = state.items.filter((plant) => plant.id !== id);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
