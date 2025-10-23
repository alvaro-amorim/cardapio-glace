import React from 'react';
// 1. Importar o Link para criar o botão
import { Link } from 'react-router-dom';
// Importamos o nosso CSS customizado
import './Home.css';

function Home() {
  return (
    // O container agora precisa ser 'relative'
    <div className="home-container">
      <img
        src="/images/capa.png"
        alt="Capa da Confeitaria Glacê"
        className="home-full-image"
      />

      {/* 2. O NOSSO NOVO BOTÃO (Call to Action) */}
      <Link 
        to="/cardapio" 
        // Usamos a classe de botão que já criámos
        // e a nossa nova classe de posicionamento
        className="btn btn-primary home-cta-button"
      >
        Ver Cardápio
      </Link>
    </div>
  );
}

export default Home;