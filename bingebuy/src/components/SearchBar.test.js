import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import { SearchBar } from './SearchBar';

test('renders SearchBar component and handles input correctly', () => {
  // Create a jest mock function for the setQuery prop
  const setQuery = jest.fn();

  // Render the component
  const { getByLabelText, getByPlaceholderText } = render(
    <SearchBar setQuery={setQuery} />
  );

  // Check if the search input and button are rendered
  const searchInput = screen.getByPlaceholderText(/Search.../i);
  const searchButton = screen.getByLabelText(/search/i);

  // Type into the search input
  fireEvent.input(searchInput, { target: { value: 'test query' } });

  // Check if setQuery function was called with the correct value
  expect(setQuery).toHaveBeenCalledWith('test query');

  // Submit the form by clicking the search button
  fireEvent.click(searchButton);

  // You can also check if setQuery is called when submitting the form
  // expect(setQuery).toHaveBeenCalledWith('test query');
});
