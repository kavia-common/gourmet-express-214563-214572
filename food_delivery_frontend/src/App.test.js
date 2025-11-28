import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home hero title', () => {
  render(<App />);
  const title = screen.getByText(/delicious meals, delivered fast/i);
  expect(title).toBeInTheDocument();
});
