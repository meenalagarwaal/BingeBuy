import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from "./context/ThemeContext";
import App from './App';

import { render } from 'react-dom'; 
import './index.css';
const root = document.getElementById('root'); 
render(
  <ThemeProvider>
  <Provider store={store}>
  <App  style={{backgroundColor:'#728BA9'}} data-testid="your-app-test-id" />
  </Provider>
  </ThemeProvider>,
  root
);