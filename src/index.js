import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Importar o Bootstrap CSS (primeiro)
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. (NOVA LINHA) Importar o Bootstrap JavaScript (Bundle)
// Isto adiciona a lógica para Toggles, Dropdowns, Modals, etc.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 3. Importar o SEU CSS (por último)
import './index.css'; 

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