import React, { useState, useEffect, useRef } from 'react'; // 1. Importar os Hooks
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 2. Criar o estado para controlar o menu (começa fechado)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 3. Criar uma referência para o elemento da navbar
  const navbarRef = useRef(null);

  // 4. Lógica para fechar o menu ao clicar FORA
  useEffect(() => {
    // Função que será chamada em qualquer clique na página
    function handleClickOutside(event) {
      // Se a referência existe E o clique foi fora do elemento da navbar...
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false); // ...fecha o menu
      }
    }

    // Adiciona o "ouvinte" de cliques
    document.addEventListener('mousedown', handleClickOutside);
    
    // Função de "limpeza": remove o "ouvinte" quando o componente "morre"
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarRef]); // A dependência é a referência

  // 5. Função para fechar o menu (usada nos links)
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // 6. Função para "toggle" (abrir/fechar) o menu no botão hamburger
  const handleToggleClick = () => {
    setIsMenuOpen(!isMenuOpen); // Inverte o estado
  };

  return (
    // 7. Adicionar a nossa referência 'ref' ao 'nav'
    <nav 
      className="navbar navbar-expand-lg navbar-light bg-white fixed-top navbar-confeitaria" 
      ref={navbarRef}
    >
      <div className="container">
        
        <Link className="navbar-brand" to="/">
          <img 
            src="/images/logo.png" 
            alt="Logo Minha Confeitaria" 
            style={{ height: '70px' }} 
            className="d-inline-block align-top"
          />
        </Link>

        {/* 8. Botão Hamburger agora controlado pelo React */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen} // Estado dinâmico
          aria-label="Toggle navigation"
          onClick={handleToggleClick} // 9. onClick chama a nossa função
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 10. O menu collapsível agora é controlado pelo React */}
        <div 
          // Adicionamos a classe 'show' dinamicamente 
          // com base no nosso estado 'isMenuOpen'
          className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto"> 
            <li className="nav-item">
              {/* 11. Links agora fecham o menu ao clicar */}
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cardapio" onClick={handleLinkClick}>
                Cardápio
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="btn btn-primary" to="/carrinho" onClick={handleLinkClick}>
                Ir para o Carrinho
                <span className="badge bg-light text-dark ms-2">
                  {totalItems}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;