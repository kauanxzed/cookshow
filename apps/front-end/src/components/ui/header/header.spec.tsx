import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from './Header';

describe('Header Component', () => {
  test('renders Header component', () => {
    render(<Header />);
    expect(screen.getByText(/CookShow/)).toBeInTheDocument();
  });

  test('Header navigation works correctly', () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter>
        <Header />
        <Route path="/perfil">Perfil Page</Route>
        <Route path="/favoritos">Favoritos Page</Route>
        <Route path="/sair">Sair Page</Route>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Perfil'));
    expect(history.location.pathname).toBe('/perfil');

    fireEvent.click(screen.getByText('Favoritos'));
    expect(history.location.pathname).toBe('/favoritos');

    fireEvent.click(screen.getByText('Sair'));
    expect(history.location.pathname).toBe('/sair');
  });

  test('Mobile menu toggle works correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Perfil')).toBeVisible();
    expect(screen.getByText('Favoritos')).toBeVisible();
    expect(screen.getByText('Sair')).toBeVisible();
  });
});
