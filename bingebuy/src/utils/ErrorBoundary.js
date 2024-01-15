import { ErrorBoundary } from 'react-error-boundary';
import FallbackPage from './FallbackPage';

function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary
    FallbackComponent={FallbackPage}
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryWrapper;
