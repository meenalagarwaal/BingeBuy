import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertDialog from './AlertDialog';

test('renders AlertDialog component and triggers close button', () => {
  const open = true;
  const handleClose = jest.fn();

  render(<AlertDialog open={open} handleClose={handleClose} />);

  const dialogTitle = screen.getByText(/Item Not Available/i);
  expect(dialogTitle).toBeInTheDocument();

  const closeButton = screen.getByText(/OK/i);
  fireEvent.click(closeButton);

  expect(handleClose).toHaveBeenCalledTimes(1);
});
