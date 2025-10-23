import React from 'react';
// Importamos o nosso CSS customizado
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <img
        // 1. Caminho para a sua imagem na pasta 'public'
        src="/images/capa.png"
        
        // 2. Texto alternativo para acessibilidade
        alt="Capa da Confeitaria Glacê"
        
        // 3. A nossa nova classe de CSS para fazer a imagem preencher a tela
        className="home-full-image"
      />
    </div>
  );
}

export default Home;