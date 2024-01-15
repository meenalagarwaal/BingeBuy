import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import cartReducer from './cartSlice';
import searchCacheReducer from './searchCacheSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    searchCache: searchCacheReducer,
  },
});

export default store;