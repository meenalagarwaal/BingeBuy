import React from 'react';
import { render, screen, waitFor,act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ErrorBoundary } from 'react-error-boundary';
import Product from '../Product';

const mockStore = configureStore([]);

describe('Product Component', () => {
  it('renders product details correctly', async () => {
    const mockProductData = {
      title: 'Mock Product',
      description: 'This is a mock product',
      price: 50,
      images: ['mock-image-url'],
    };

    const store = mockStore({
      selectedItem: mockProductData,
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockProductData),
    });

    render(
        <Provider store={store}>
              <ErrorBoundary>
        <MemoryRouter initialEntries={[`/products/${mockProductData.id}`]}>
          {/* Use Routes component */}
          <Routes>
            {/* Define individual Route */}
            <Route path="/products/:id" element={<Product />} />
          </Routes>
        </MemoryRouter>
        </ErrorBoundary>
      </Provider>
    );

    // Wait for the component to load
    await waitFor(() => {
      // Assert the first condition
      expect(screen.getByAltText(mockProductData.title)).toBeInTheDocument();
    });

    // Continue with the next assertion after the first one is fulfilled
    await waitFor(() => {
      // Assert the second condition
      expect(screen.getByText(mockProductData.title)).toBeInTheDocument();
    });

    // Repeat the process for additional assertions
    await waitFor(() => {
      expect(screen.getByText(mockProductData.description)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Price: ₹${mockProductData.price}`)).toBeInTheDocument();
    });
  });
  });
                                                                                                                                                              