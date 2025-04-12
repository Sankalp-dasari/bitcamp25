import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders footer text', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const footerElement = screen.getByText(/© 2025 BitComp 25. All rights reserved./i);
  expect(footerElement).toBeInTheDocument();
});