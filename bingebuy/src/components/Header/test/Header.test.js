import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from '../../../context/ThemeContext';
import Header from '../index';

const mockStore = configureStore();

describe('Header', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: [],
    });
  });

  test('renders Header component with light mode and cart badge= ""', () => {
    render(
      <Router>
        <Provider store={store}>
        <ThemeProvider>
        <Header />
       </ThemeProvider>
        </Provider>
      </Router>
    );
    const lightModeIcon = screen.getByTestId('light-mode-icon');
    expect(lightModeIcon).toBeInTheDocument();
    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge.textContent).toBe('');
  });

  test('toggles dark mode on button click', () => {
    render(
        <Router>
        <Provider store={store}>
        <ThemeProvider>
        <Header />
      </ThemeProvider>
        </Provider>
      </Router>
    );
    const lightModeButton = screen.getByTestId('light-mode-icon');
    expect(lightModeButton).toBeInTheDocument();
    fireEvent.click(lightModeButton);
    const darkModeButton = screen.getByTestId('dark-mode-icon');
    expect(darkModeButton).toBeInTheDocument();
  });

  test('clicking on the cart icon opens the cart modal', () => {
    render(
      <Router>
        <Provider store={store}>
        <ThemeProvider>
        <Header />
      </ThemeProvider>
        </Provider>
      </Router>
    );
    const cartIcon = screen.getByTestId('cart-icon');
    fireEvent.click(cartIcon);
    const cartModal = screen.getByTestId('cart-modal');
    expect(cartModal).toBeInTheDocument();
  });

test('calculates count correctly based on cartItems', () => {
    const initialState = {
      cart: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
      ],
    };
    const store = mockStore(initialState);
    render(
        <Router>
        <Provider store={store}>
        <ThemeProvider>
        <Header />
      </ThemeProvider>
        </Provider>
      </Router>
    );
    // Extract the count value from the rendered component
    const countElement = screen.getByTestId('cart-badge'); 
    const count = parseInt(countElement.textContent);
    expect(count).toBe(5); 
  });
});

