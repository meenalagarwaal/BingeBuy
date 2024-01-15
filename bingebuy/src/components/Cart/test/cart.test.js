import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux'; // Import Provider
import configureStore from 'redux-mock-store'; // Import configureStore
import Cart from '../index.jsx';
import { removeFromCart, addToCart } from '../../../store/cartSlice.js';

const mockStore = configureStore([]);
const store = mockStore({
  cart: [
    { id: 1, title: 'Item 1', quantity: 2, price: 10, stock: 5 },
    { id: 2, title: 'Item 2', quantity: 1, price: 20, stock: 10 },
  ],
  search: {
    items: [
      // Mock search items here
    ],
  },
});

describe('Cart Component', () => {
  test('<EmptyCart />', () => {
    render(
      <Provider store={store}>
        <Cart open={true} handleClose={() => { }} count={0} />
      </Provider>
    );

    expect(screen.getByText('YOUR CART')).toBeInTheDocument();
    expect(screen.getByText('Your Cart is Empty :(')).toBeInTheDocument();
  });

  test('renders Cart component correctly', () => {
    render(
      <Provider store={store}>
        <Cart open={true} handleClose={() => { }} count={2} />
      </Provider>
    );

    expect(screen.getByText('YOUR CART')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles remove from cart action', () => {
    const initialState = {
      cart: [
        { id: 1, title: 'Item 1', quantity: 2, price: 10, stock: 5 },
        { id: 2, title: 'Item 2', quantity: 1, price: 10, stock: 3 },
      ],
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Cart open={true} handleClose={() => { }} count={3} />
      </Provider>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    fireEvent.click(screen.getAllByLabelText('deleteIcon')[0]);
    const expectedActions = [
      removeFromCart(1),
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('handles add to cart action', () => {
    const initialState = {
      cart: [
        { id: 1, title: 'Item 1', quantity: 2, price: 10, stock: 5 },
        { id: 2, title: 'Item 2', quantity: 1, price: 10, stock: 3 },
      ],
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Cart open={true} handleClose={() => { }} count={3} />
      </Provider>
    );

    // Check if cart items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    // Perform action (add)
    fireEvent.click(screen.getAllByLabelText('add')[0]); // Add Item 1

    // Check if the addToCart action is dispatched correctly
    const expectedActions = [
      addToCart({ id: 1, title: 'Item 1', quantity: 2, price: 10, stock: 5 }), // Add Item 1
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  // it("handles delete item from cart", async() => {
  //   const mockCartItem = { id: 1, title: "Item 1", quantity: 2, price: 10 };
  //   const mockCartItems = [mockCartItem];

  //   const handleDeleteItemFromCart = jest.fn();
  //   const handleClose = jest.fn();

  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <Cart open={true} handleClose={handleClose} count={mockCartItems.quantity} />
  //     </Provider>
  //   );

  //   await waitFor(() => {
  //     const deleteButton = screen.getByTestId(`Delete${mockCartItem.id}`);
  //     expect(deleteButton).toBeInTheDocument();
  //   });
  
  //   // Simulate a click on the delete button after the waitFor has completed
  //   const deleteButton = screen.getByTestId(`Delete${mockCartItem.id}`);
  //   fireEvent.click(deleteButton);
  
  //   // Check if the handleDeleteItemFromCart function is called with the correct item ID
  //   expect(handleDeleteItemFromCart).toHaveBeenCalledWith(mockCartItem.id);
  //   });

  });


