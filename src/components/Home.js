import React from 'react';
import { Link } from 'react-router-dom';
// Importamos o nosso CSS customizado
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      
      {/* --- MODIFICAÇÃO AQUI --- */}
      {/* Usamos a tag <picture> para responsividade nativa */}
      <picture>
        {/* 1. Define a imagem para telas GRANDES (desktop/notebook) */}
        {/* (min-width: 768px) é um breakpoint padrão (telas 'md' do Bootstrap) */}
        <source 
          srcSet="/images/capa-desktop.png" 
          media="(min-width: 501px)" 
        />
        
        {/* 2. Define a imagem para telas PEQUENAS (mobile) */}
        <source 
          srcSet="/images/capa.png" 
          media="(max-width: 500px)" 
        />
        
        {/* 3. A tag <img> é o fallback (caso o browser seja antigo)
            É esta tag que recebe o 'alt' text e a NOSSA CLASSE DE CSS
            para ficar em tela cheia.
        */}
        <img
          src="/images/capa-mobile.png" // Imagem padrão (mobile-first)
          alt="Capa da Confeitaria Glacê"
          className="home-full-image" // A MESMA classe que já tínhamos!
        />
      </picture>
      {/* --- FIM DA MODIFICAÇÃO --- */}

      {/* O seu botão (Call to Action) continua igual */}
      <Link 
        to="/cardapio" 
        className="btn btn-primary home-cta-button"
      >
        Ver Cardápio
      </Link>
    </div>
  );
}

export default Home;