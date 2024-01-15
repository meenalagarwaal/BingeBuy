import { createSlice } from '@reduxjs/toolkit';


const searchCacheSlice = createSlice({
  name: 'searchCache',
  initialState: {
    cacheItems: {},
  },
  reducers: {
    searchCacheItems: (state, action) => {
      if (action.payload.searchQuery) {
        state.cacheItems = {
          ...state.cacheItems,
          [action.payload.searchQuery]: action.payload.items
        }
      }
    }
  },
});

export const { searchCacheItems } = searchCacheSlice.actions;
export default searchCacheSlice.reducer;

