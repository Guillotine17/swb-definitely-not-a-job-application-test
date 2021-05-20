import { render, screen } from '@testing-library/react';
import App from './App';

test('renders password form', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/password/i);
  linkElement.forEach((element) => {
    expect(element).toBeInTheDocument();
  })
});
