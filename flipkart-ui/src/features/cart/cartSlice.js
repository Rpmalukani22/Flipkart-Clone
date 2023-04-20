import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const { id, retailPrice, discountedPrice, productSpecifications} = action.payload;
      let price = (productSpecifications.discounted)?discountedPrice:retailPrice;
      const itemIndex = state.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload,price, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        if (state[itemIndex].quantity === 1) {
          state.splice(itemIndex, 1);
        } else {
          state[itemIndex].quantity -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
