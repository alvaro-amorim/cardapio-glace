import React from 'react';
import { useNavigate } from 'react-router-dom';

// O 'react-toastify' passa a prop 'closeToast' automaticamente
// para o nosso componente customizado.
function ToastContent({ closeToast }) {
  
  // 1. Usamos o hook 'useNavigate' para podermos redirecionar o utilizador
  const navigate = useNavigate();

  // 2. Função para o botão "Ir para o carrinho"
  const handleGoToCart = () => {
    navigate('/carrinho'); // Redireciona para a página do carrinho
    closeToast();         // Fecha a notificação
  };

  // 3. Função para o botão "Adicionar mais"
  const handleContinueShopping = () => {
    closeToast(); // Apenas fecha a notificação
  };

  return (
    <div>
      <h5 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fcfaf1' }}>
        Item adicionado ao carrinho!
      </h5>
      <div className="mt-3">
        <button 
          className="btn btn-primary btn-sm me-2" 
          onClick={handleGoToCart}
        >
          Ir para o carrinho
        </button>
        <button 
          className="btn btn-outline-light btn-sm" 
          onClick={handleContinueShopping}
        >
          Continuar a comprar
        </button>
      </div>
    </div>
  );
}

export default ToastContent;