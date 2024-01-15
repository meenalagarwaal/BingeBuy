import React from 'react';
import Header from './components/Header';
import Products from './components/Products';
import ErrorBoundaryWrapper from './utils/ErrorBoundary';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartItem from './components/Cart';
import Product from './components/Products/Product';

function ErrorFallback({ error }) {
  return (
      <div>
          <h1>Application Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      </div>
  );
}

function App() {
  return (
  //  <ErrorBoundaryWrapper
  //   fallbackRender={ErrorFallback}>
  //   <Header />
  //   <Products />
  // </ErrorBoundaryWrapper>
<Router>
      <ErrorBoundaryWrapper fallbackRender={ErrorFallback}>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </ErrorBoundaryWrapper>
    </Router>
  );
}

export default App;
