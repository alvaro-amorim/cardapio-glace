import React from 'react';
// Importamos o nosso CSS customizado
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* O Vídeo de Fundo */}
      <video 
        autoPlay // Faz o vídeo começar sozinho
        loop     // Faz o vídeo repetir
        muted    // Essencial para o autoPlay funcionar na maioria dos browsers
        className="home-video-bg"
      >
        {/* O vídeo deve estar na pasta 'public'. 
          Se o seu vídeo tiver outro nome, altere 'video-confeitaria.mp4'.
        */}
        <source src="/video-confeitaria.mp4" type="video/mp4" />
        O seu browser não suporta vídeos.
      </video>

      {/* O Conteúdo Sobreposto (Mensagem) */}
      <div className="home-content">
        <h1>Bem-vindo à glacê Confeitaria</h1>
        <p>Os doces que transformam o seu dia.</p>
      </div>
    </div>
  );
}

export default Home;