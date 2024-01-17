import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('renders Header component with light mode and cart badge= ""', () => {
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

  it('toggles dark mode on button click', () => {
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

  it('clicking on the cart icon opens the cart modal', () => {
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

it('calculates count correctly based on cartItems', () => {
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
 
  // it('closes the cart modal when the close button is clicked', async () => {
  //   render(
  //     <Provider store={store}>
  //       <ThemeProvider>
  //         <Header />
  //       </ThemeProvider>
  //     </Provider>
  //   );


  //   const cartIcon = screen.getByTestId('cart-icon');
  //   fireEvent.click(cartIcon);
  //   const cartModal = screen.getByTestId('cart-modal');
  //   expect(cartModal).toBeInTheDocument();

  //   // Click the close button inside the modal
  //   const closeButton = screen.getByTestId('cart-close');
  //   fireEvent.click(closeButton);

  //   // Wait for the modal to be fully closed
  //   await waitFor(() => {
  //     const closedCartModal = screen.queryByTestId('cart-modal');
  //     expect(closedCartModal).toBeNull();
  //   });
  // });

});

