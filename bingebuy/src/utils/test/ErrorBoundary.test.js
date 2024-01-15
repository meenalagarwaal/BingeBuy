import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundaryWrapper from '../ErrorBoundary';
import FallbackPage from '../FallbackPage';

jest.mock('../FallbackPage', () => () => <div>Error fallback page</div>);

describe('ErrorBoundaryWrapper', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundaryWrapper>
        <div>Child Component</div>
      </ErrorBoundaryWrapper>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders fallback page when there is an error', () => {
    // Mock a component that throws an error
    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundaryWrapper>
        <ErrorThrowingComponent />
      </ErrorBoundaryWrapper>
    );

    expect(screen.getByText('Error fallback page')).toBeInTheDocument();
  });
});
