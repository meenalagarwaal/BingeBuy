import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from "./context/ThemeContext";
import App from './App';

const root = document.getElementById('root') || document.createElement('div');
const createRoot = ReactDOM.createRoot(root);

createRoot.render(
  <ThemeProvider>
    <Provider store={store}>
    <App  style={{backgroundColor:'#728BA9'}} data-testid="your-app-test-id" />
  </Provider>
 </ThemeProvider>
);
