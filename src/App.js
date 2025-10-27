import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importa os nossos componentes
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Carrinho from './components/Carrinho'; 
import Footer from './components/Footer';

// 1. Importar o nosso novo componente
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App">
      {/* 2. Adicionar o componente aqui. 
          Ele vai "ouvir" as mudanças nas <Routes> abaixo */}
      <ScrollToTop />
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
      
      <Footer />
      
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;