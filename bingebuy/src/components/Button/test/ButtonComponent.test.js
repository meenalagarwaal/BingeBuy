import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonComponent from '../index.jsx';

describe('Button Component', () => {
it('renders ButtonComponent correctly', () => {
  render(<ButtonComponent onClick={() => {}} />);

  // Assert that the button is rendered with the correct styling
  const button = screen.getByRole('button', { name: /delete/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveStyle({
    marginTop: '10px',
    marginLeft: '11px',
    backgroundColor: '#06366F',
    color: 'white',
    fontSize: '8px',
  });
});

it('calls onClick prop when the button is clicked', () => {
  const onClickMock = jest.fn();
  render(<ButtonComponent onClick={onClickMock} />);

  // Simulate a button click
  const button = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(button);

  // Assert that the onClick prop is called
  expect(onClickMock).toHaveBeenCalledTimes(1);
})

});
