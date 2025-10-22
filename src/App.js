import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa os nossos 3 componentes de página
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
// 1. Importar o novo componente
import Carrinho from './components/Carrinho'; 

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Menu />} />
        
        {/* 2. Adicionar a nova rota */}
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </div>
  );
}

export default App;