import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 

// 1. Importar a biblioteca de Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importa os nossos componentes
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Carrinho from './components/Carrinho'; 
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
      
      <Footer />
      
      {/* 2. Adicionar o Contentor de Notificações.
          Ele fica aqui mas é "invisível" até ser chamado.
          Usamos o tema "colored" para que a cor da notificação
          seja sólida (vermelha, no nosso caso).
      */}
      <ToastContainer 
        position="bottom-right" // Posição
        autoClose={5000}         // Fecha em 5 segundos
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"          // TEMA IMPORTANTE
      />
    </div>
  );
}

export default App;