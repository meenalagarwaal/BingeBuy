/* eslint-disable react/no-unknown-property */

import React from "react";
import { render, screen, fireEvent, act, waitFor, dispatchedActions, userEvent } from "@testing-library/react";
import { Provider,useSelector,useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary"; 
import { addToCart } from '../../../store/cartSlice.js';
import { searchCacheItems } from "../../../store/searchCacheSlice.js";
import getItems from '../index.jsx';
import { fetchItemsSuccess, fetchItemsFailure, fetchItemsStart } from '../../../store/searchSlice.js';
import { removeFromCart } from '../../../store/cartSlice.js';
import { handleRemoveFromCart } from '../index.jsx';
import { useErrorBoundary } from 'react-error-boundary';
import thunk from 'redux-thunk';
import Product from "../index";


global.fetch = jest.fn();
const mockStore = configureStore([]);
const store = mockStore();
const mockProductData = {
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
      "https://cdn.dummyjson.com/product-images/1/3.jpg",
      "https://cdn.dummyjson.com/product-images/1/4.jpg",
      "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    ]
};

describe("Product Component", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("renders product details correctly", async () => {
    const store = mockStore({
      search: {
        items: [mockProductData],
        loading: false,
        searchQuery: "iPhone 9",
      },
      searchCache: {},
      cart: [],
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
        <ErrorBoundary>
            <Product />
          </ErrorBoundary>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId("iPhone 9")).toBeInTheDocument(); 
    expect(screen.getByText("An apple mobile which is nothing like apple")).toBeInTheDocument();
    expect(screen.getByText("Price: ₹549")).toBeInTheDocument();
  });
  it('should dispatch fetchItemsSuccess when cacheItems are present', () => {
    const mockData = {
      products: [
        { id: 1, title: 'Product 1', price: 20, stock: 10, thumbnail: 'image_url_1.jpg' },
      ],
    };
    const store = mockStore({
      search: {
        items: [],
        loading: false,
        searchQuery: 'mockedQuery',
      },
      searchCache: {
        cacheItems: {
          mockedQuery: mockData.products, 
        },
      },
      cart: {
      },
    });
    render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );

   
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'search/fetchItemsSuccess',
        payload: mockData.products,
      },
    ]);
  });

  it('should render loading state when loading is true', () => {
    const store = mockStore({
      search: {
        items: [],
        loading: true, 
        searchQuery: 'mockedQuery',
      },
      searchCache: {
        cacheItems: {},
      },
      cart: {
      },
    });
    render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'search/fetchItemsStart',
      },
    ]);
  });

  it('should render content when loading is false', () => {
    const store = mockStore({
      search: {
        items: [
        ],
        loading: false,
        searchQuery: 'mockedQuery',
      },
      searchCache: {
        cacheItems: {},
      },
      cart: {
      },
    });

    render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );
    const loadingElement = screen.queryByText(/Loading.../i);
    expect(loadingElement).not.toBeInTheDocument();
  });

  it('should display "NO RESULTS FOUND!" when items array is empty', () => {
    const store = mockStore({
      search: {
        items: [],
        loading: false,
        searchQuery: 'mockedQuery',
      },
      searchCache: {
        cacheItems: {},
      },
      cart: {
        cartItems: [],
      },
    });

    render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );

    const noResultsElement = screen.getByText('NO RESULTS FOUND!');
    expect(noResultsElement).toBeInTheDocument();
  });

  it("Clicking delete button for the first item", async() => {
    const store = mockStore({
      search: {
        items: [mockProductData],
        loading: false,
        searchQuery: "iPhone 9",
      },
      searchCache: {},
      cart: [],
    });
    render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );
    const idToDelete = 1;
    const deleteButtons = await screen.findAllByTestId(`delete${idToDelete}`);
    expect(deleteButtons.length).toBeGreaterThan(0);
    fireEvent.click(deleteButtons[0]);
  });

  it("Clicking add button for the first item", async() => {
    const store = mockStore({
      search: {
        items: [mockProductData],
        loading: false,
        searchQuery: "iPhone 9",
      },
      searchCache: {},
      cart: [],
    });
    render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );
    const idToDelete = 1;
    const addButtons = await screen.findAllByTestId(`add${idToDelete}`);
    expect(addButtons.length).toBeGreaterThan(0);
    fireEvent.click(addButtons[0]);
  });

  it("Clicking remove button for the first item", async() => {
    const store = mockStore({
      search: {
        items: [mockProductData],
        loading: false,
        searchQuery: "iPhone 9",
      },
      searchCache: {},
      cart: [],
    });
    render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );
    const idToDelete = 1;
    const addButtons = await screen.findAllByTestId(`remove${idToDelete}`);
    expect(addButtons.length).toBeGreaterThan(0);
    fireEvent.click(addButtons[0]);
  });


  it('should dispatch addToCart action when Add to Cart button is clicked', () => {
    const sampleProduct = {
      id: 1,
      title: 'Sample Product',
      description: 'Description of the product',
      price: 20,
      stock: 10,
    };
    const initialState = {
      search: {
        items: [sampleProduct],
        loading: false,
        searchQuery: 'sample',
      },
      cart: [],
    };
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );

    // Find the Add to Cart button and click it
    const addToCartButton = screen.getByTestId(`add${sampleProduct.id}`);
    fireEvent.click(addToCartButton);

    // Check if the addToCart action was dispatched with the correct payload
    const expectedAction = addToCart(sampleProduct);
    const actions = store.getActions();
    expect(actions).toContainEqual(expectedAction);
  });

  it('should dispatch removeFromCart action when Remove button is clicked', () => {
    const sampleProductInCart = {
      id: 1,
      title: 'Sample Product',
      description: 'Description of the product',
      price: 20,
      stock: 10,
      quantity: 2, 
    };
    const initialState = {
      search: {
        items: [sampleProductInCart],
        loading: false,
        searchQuery: 'sample',
      },
      cart: [sampleProductInCart],
    };
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );
    const removeButton = screen.getByTestId(`remove${sampleProductInCart.id}`);
    fireEvent.click(removeButton);
    const expectedAction = removeFromCart(sampleProductInCart.id);
    expect(store.getActions()).toContainEqual(expectedAction);
  });

  it('should dispatch fetchItemsSuccess action when deleting an item', () => {
    const sampleItemToDelete = {
      id: 1,
      title: 'Sample Product',
      description: 'Description of the product',
      price: 20,
      stock: 10,
    };
    const initialState = {
      search: {
        items: [sampleItemToDelete],
        loading: false,
        searchQuery: 'sample',
      },
      searchCache: {
        cacheItems: {},
      },
    };
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
      <MemoryRouter>
      <ErrorBoundary>
          <Product />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
    );
    window.confirm = jest.fn(() => true);
    const deleteButton = screen.getByTestId(`delete${sampleItemToDelete.id}`);
    fireEvent.click(deleteButton);
    const expectedAction = fetchItemsSuccess([]);
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});