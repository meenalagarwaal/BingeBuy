import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart, removeFromCart, deleteFromCart } from '../cartSlice';

describe('cartSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  it('should add an item to the cart', () => {
    const newItem = {
      id: '1',
      name: 'Sample Item',
      price: 10,
    };

    store.dispatch(addToCart(newItem));

    const state = store.getState().cart;
    expect(state).toHaveLength(1);
    expect(state[0]).toEqual({ ...newItem, quantity: 1 });
  });

  it('should increment quantity for an existing item in the cart', () => {
    const existingItem = {
      id: '1',
      name: 'Existing Item',
      price: 20,
    };

    // Add the item to the cart first
    store.dispatch(addToCart(existingItem));

    // Dispatch another addToCart action for the same item
    store.dispatch(addToCart(existingItem));

    const state = store.getState().cart;
    expect(state).toHaveLength(1);
    expect(state[0]).toEqual({ ...existingItem, quantity: 2 });
  });

  it('should remove an item from the cart', () => {
    const itemToRemove = {
      id: '1',
      name: 'Item to Remove',
      price: 15,
      quantity: 1,
    };

    // Add the item to the cart first
    store.dispatch(addToCart(itemToRemove));

    // Remove the item from the cart
    store.dispatch(removeFromCart(itemToRemove.id));

    const state = store.getState().cart;
    expect(state).toHaveLength(0);
  });

  it('should decrement quantity for an existing item in the cart', () => {
    const itemWithQuantity = {
      id: '1',
      name: 'Item with Quantity',
      price: 25,
      quantity: 2,
    };
  
    // Add the item to the cart first
    store.dispatch(addToCart(itemWithQuantity));
  
    // Dispatch removeFromCart action to decrement quantity
    store.dispatch(removeFromCart(itemWithQuantity.id));
  
    const state = store.getState().cart;
    expect(state).toHaveLength(0);
  });

  it('should delete an item from the cart', () => {
    const itemToDelete = {
      id: '1',
      name: 'Item to Delete',
      price: 30,
      quantity: 1,
    };

    // Add the item to the cart first
    store.dispatch(addToCart(itemToDelete));

    // Delete the item from the cart
    store.dispatch(deleteFromCart(itemToDelete.id));

    const state = store.getState().cart;
    expect(state).toHaveLength(0);
  });
  it('should decrement quantity when quantity is greater than 1', () => {
    const initialState = [
      { id: '1', name: 'Item 1', quantity: 3 },
      { id: '2', name: 'Item 2', quantity: 1 },
    ];
    const action = removeFromCart('1'); 
    const newState = cartReducer(initialState, action);
    expect(newState).toEqual([
      { id: '1', name: 'Item 1', quantity: 2 }, 
      { id: '2', name: 'Item 2', quantity: 1 }, 
    ]);
  });

});
