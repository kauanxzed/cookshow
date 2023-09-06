import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/ui/header/header';
import Footer from './components/ui/footer/footer';
import Home from './pages/home/home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Home />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
