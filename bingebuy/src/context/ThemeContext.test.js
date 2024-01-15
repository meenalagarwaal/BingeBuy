import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext'; // Replace with the actual file path

const MockComponent = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <div>
      <div data-testid="theme-status">{isDarkTheme ? 'Dark Theme' : 'Light Theme'}</div>
      <button onClick={toggleTheme} data-testid="toggle-theme-button">
        Toggle Theme
      </button>
    </div>
  );
};
const ComponentUsingTheme = () => {
    try {
      useTheme();
      return <div>Success</div>;
    } catch (error) {
      return <div>{error.message}</div>;
    }
  };

describe('ThemeProvider and useTheme', () => {
  it('should render the component with the default theme', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status').textContent).toBe('Light Theme');
  });

  it('should toggle the theme when the button is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>
    );

    // Click the button to toggle the theme
    fireEvent.click(screen.getByTestId('toggle-theme-button'));

    // Check if the theme is toggled (dark theme)
    expect(screen.getByTestId('theme-status').textContent).toBe('Dark Theme');
  });

  it("throws an error when used outside ThemeProvider", () => {
    const { getByText } = render(<ComponentUsingTheme />);
    expect(screen.getByText("useTheme must be used within a ThemeProvider")).toBeInTheDocument();
  });
});
