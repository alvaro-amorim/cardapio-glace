import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-confeitaria mt-auto py-4">
      <div className="container">
        
        {/* --- LINHA 1: Logo e Ícones (Sempre centralizados como um grupo) --- */}
        {/* 1. Usamos 'text-center' para centralizar 
           todo o conteúdo desta linha */}
        <div className="text-center mb-3">
          
          {/* 2. Colocamos a Logo como 'inline-block' e damos uma
             margem à direita (me-4) para a separar dos ícones */}
          <div className="d-inline-block align-middle me-4">
            <img 
              src="/images/icone.png" 
              alt="Ícone Glacê Confeitaria" 
              style={{ height: '50px', margin: '-30px'}} 
            />
          </div>

          {/* 3. Colocamos os Ícones também como 'inline-block' */}
          <div className="d-inline-block align-middle">
            <a 
              href="https://www.instagram.com/glaceconfeitariaa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=5532984860949" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* --- LINHA 2: Copyright (Abaixo e Centralizado) --- */}
        {/* (Esta parte fica igual à anterior) */}
        <div className="row">
          <div className="col-12 text-center">
            <small className="footer-text footer-copyright">
              &copy; {new Date().getFullYear()} Glacê Confeitaria. Todos os direitos reservados. <br/> Página criada por Comerc IA's
            </small>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;