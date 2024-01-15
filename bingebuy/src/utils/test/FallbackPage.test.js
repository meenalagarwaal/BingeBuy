import React from 'react';
import { render, screen } from '@testing-library/react';
import FallbackPage from '../FallbackPage';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

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
});
