import React from 'react';
import ReactDOM from 'react-dom/client';

/* --- ESTA É A PARTE MAIS IMPORTANTE --- */
/* A ORDEM TEM DE SER ESTA: */

// 1. O CSS do Bootstrap (Base)
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. O JavaScript do Bootstrap (para o Menu Toggle)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 3. O SEU CSS (Com as suas cores e fontes)
//    Se esta linha faltar, o seu site fica sem cores.

/* --- FIM DA PARTE IMPORTANTE --- */

import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();