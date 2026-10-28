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
          cost: plant.cost ?? plant.price,
          image: plant.image,
          quantity: 1,
        });
      }
    },

    // Delete the entire cart entry (regardless of its quantity).
    removeItem: (state, action) => {
      // Accept either plant.name (Coursera task) or plant.id (existing code).
      const identifier = action.payload;
      state.items = state.items.filter((item) => item.name !== identifier && item.id !== identifier);
    },

    // Set quantity explicitly. Quantity zero removes the entry.
    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload;
      const item = state.items.find((plant) => (id ? plant.id === id : plant.name === name));
      if (!item || !Number.isInteger(quantity)) return;
      if (quantity <= 0) {
        state.items = state.items.filter((plant) => plant !== item);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
