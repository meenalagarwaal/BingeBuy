import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  // counter:0,
  counters: {},
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        const item = state[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.splice(itemIndex, 1);
        }
      }
    },
    deleteFromCart:(state,action)=>{
      const itemId = action.payload;
      const itemIndex = state.findIndex(item => item.id === itemId);
      state.splice(itemIndex, 1);
    }
  },
});

export const { addToCart, removeFromCart,deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;

