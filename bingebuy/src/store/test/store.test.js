import store from '../store'; 
import { addToCart } from '../cartSlice';
import { searchQueryItems } from "../searchSlice";


describe('Redux Store Configuration', () => {
  it('should dispatch actions and update the state', () => {
    const mockSearchQuery = 'testQuery';
    const mockCartItem = { id: '1', name: 'Item 1', quantity: 1 };
    store.dispatch(searchQueryItems(mockSearchQuery));
    store.dispatch(addToCart(mockCartItem));
    const state = store.getState();
    expect(state.search.searchQuery).toEqual(mockSearchQuery);
    expect(state.cart).toContainEqual(mockCartItem);
  });
});
