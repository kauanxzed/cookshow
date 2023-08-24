import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/header/header';
import Footer from './Components/footer/footer';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <Footer/>
    </BrowserRouter>
  </StrictMode>
);
