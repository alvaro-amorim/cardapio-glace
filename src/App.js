import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Importar o nosso CSS do App (para o footer ficar em baixo)
import './App.css'; 

// Importa os nossos componentes
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Carrinho from './components/Carrinho'; 
// 2. Importar o novo componente
import Footer from './components/Footer';

function App() {
  return (
    // Esta classe 'App' vem do App.css
    <div className="App">
      <Navbar />

      {/* O conteúdo principal da página */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
      
      {/* 3. Renderizar o Footer aqui (fora das Rotas) */}
      <Footer />
    </div>
  );
}

export default App;