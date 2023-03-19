import { render, screen } from '@testing-library/react';
import Home from './index';

test('renders title text', () => {
  render(<Home />);
  // make virtual dom, makes component
  const linkElement = screen.getByText(/meets happy/i);
  // on screen find makes happy
  expect(linkElement).toBeInTheDocument();
});

test('renders informational text', () => {
  render(<Home />);
  const linkElement = screen.getByText(/utrition is a/i);
  expect(linkElement).toBeInTheDocument();
});

// test('renders home page image', () => {
//   render(<Home />);
//   const linkElement = screen.getByText(/utrition is a/i);
//   expect(linkElement).toBeInTheDocument();
//   expect(getByDataTestId('background')).toHaveAttribute('src', '../../../../assets/images/image.jpg')
// });