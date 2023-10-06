import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Footer';
import '@testing-library/jest-dom/extend-expect';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });

  it('displays static text', () => {
    const { getByText } = render(
      <Router>
        <Footer />
      </Router>
    );

    expect(
      getByText('© 2023 CookShow - Todos os direitos reservados')
    ).toBeInTheDocument();
    expect(getByText('Cozinhe do seu jeito!')).toBeInTheDocument();
  });

  it('renders navigation links with correct paths', () => {
    const { getByText } = render(
      <Router>
        <Footer />
      </Router>
    );

    expect(getByText('Quem Somos').closest('a')).toHaveAttribute(
      'href',
      '/quem-somos'
    );
    expect(getByText('Termos').closest('a')).toHaveAttribute('href', '/termos');
    expect(getByText('Privacidade').closest('a')).toHaveAttribute(
      'href',
      '/privacidade'
    );
    expect(getByText('Fale Conosco').closest('a')).toHaveAttribute(
      'href',
      '/fale-conosco'
    );
  });
});
