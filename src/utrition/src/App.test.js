import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import userEvent from '@testing-library/user-event'
// import {BrowserRouter, MemoryRouter} from 'react-router-dom'



  test('routes from home to profile page', () => {
    render(<App />)
    expect(screen.getByText(/Profile/)).toBeInTheDocument()
    userEvent.click(screen.getByText(/Profile/));
    expect(screen.getByText(/Your most/i)).toBeInTheDocument()
  });