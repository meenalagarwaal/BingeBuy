import React from 'react';
import { render, screen } from '@testing-library/react';
import FallbackPage from '../FallbackPage';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import cartReducer from '../../store/cartSlice';
import configureStore from 'redux-mock-store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockStore = configureStore();

describe('FallbackPage', () => {
  it('renders fallback page with error message', () => {
    useSelector.mockReturnValue({ error: 'Test error' });
    render(<FallbackPage resetErrorBoundary={() => {}} />);
    const image = screen.getByAltText('Thinking Man');
    expect(image).toBeInTheDocument();
    const errorMessage = screen.getByText('Oops ! Test error');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders fallback page without error message', () => {
    useSelector.mockReturnValue({ error: '' });
    render(<FallbackPage resetErrorBoundary={() => {}} />);
    const image = screen.getByAltText('Thinking Man');
    expect(image).toBeInTheDocument();
    const errorMessage = screen.getByText('Oops !');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should do nothing for unknown action', () => {
    const initialState = [{ id: 1, name: 'Sample Item', price: 10.0, quantity: 2 }];
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = cartReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

});
