import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/upload/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
  test('should pass', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(history.location.pathname).toBe('/home');
    fireEvent.click(getByText('Upload'));
    expect(history.location.pathname).toBe('/upload');
  });
});

// import { fireEvent, render } from '@testing-library/react';
// import React from 'react';
// import { Router } from 'react-router-dom';
// import ButtonLogin from './ButtonLogin';
// import { createMemoryHistory } from 'history';
// describe('ButtonLogin', () => {
//   test('should pass', () => {
//     const history = createMemoryHistory({ initialEntries: ['/home'] });
//     const { getByText } = render(
//       <Router history={history}>
//         <ButtonLogin />
//       </Router>
//     );
//     expect(history.location.pathname).toBe('/home');
//     fireEvent.click(getByText('Iniciar sesión'));
//     expect(history.location.pathname).toBe('/login');
//   });
// });
