import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
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
    ],
  },
});

describe('Cart Component', () => {
  it('<EmptyCart />', () => {
    render(
      <Provider store={store}>
        <Cart open={true} handleClose={() => { }} count={0} />
      </Provider>
    );

    expect(screen.getByText('YOUR CART')).toBeInTheDocument();
    expect(screen.getByText('Your Cart is Empty :(')).toBeInTheDocument();
  });

  it('renders Cart component correctly', () => {
    render(
      <Provider store={store}>
        <Cart open={true} handleClose={() => { }} count={2} />
      </Provider>
    );

    expect(screen.getByText('YOUR CART')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
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
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    fireEvent.click(screen.getAllByLabelText('add')[0]);

    const expectedActions = [
      addToCart({ id: 1, title: 'Item 1', quantity: 2, price: 10, stock: 5 }),
    ];
    expect(store.getActions()).toEqual(expectedActions);
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

  jest.spyOn(console, "error").mockImplementation(() => { });
  it("handles remove from cart with error", () => {
    store.dispatch = jest.fn(() => {
      throw new Error("Simulated error");
    });
    render(
      <Provider store={store}>
        <Cart open={true} handleClose={() => { }} count={3} />
      </Provider>
    );
    fireEvent.click(screen.getAllByLabelText('deleteIcon')[0]);
    expect(console.error).toHaveBeenCalledWith("Error removing item from cart:", expect.any(Error));
  });

  it("handles delete item from cart", async () => {
    render(
      <Provider store={store}>
        <Cart open={true} handleClose={() => { }} count={3} />
      </Provider>
    );
    fireEvent.click(screen.getAllByLabelText('deleteButton')[0]);
  });

  it("handles error deleting item from cart", () => {
    store.dispatch = jest.fn(() => {
      throw new Error("Simulated error");
    });
    render(
      <Provider store={store}>
        <Cart open={true} handleClose={() => { }} count={1} />
      </Provider>
    );
    fireEvent.click(screen.getAllByLabelText('deleteButton')[0]);
    expect(console.error).toHaveBeenCalledWith("Error deleting item from cart:", expect.any(Error));
  });
});


