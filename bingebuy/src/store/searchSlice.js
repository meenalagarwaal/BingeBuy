// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';


const searchSlice = createSlice({
  name: 'search',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    searchQuery: '',
  },
  reducers: {
    searchQueryItems: (state, action) => {
      state.searchQuery = action.payload;
    },
    fetchItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteItem:(state,action)=>{
      state.items = action.payload;
    }
  },
});

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsFailure, searchQueryItems,deleteItem } = searchSlice.actions;
export default searchSlice.reducer;
