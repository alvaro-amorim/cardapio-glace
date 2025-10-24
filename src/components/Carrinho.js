import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Carrinho() {
  // 1. Pegar tudo o que precisamos do nosso Contexto
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // 2. Calcular o Preço Total
  // (Esta lógica assume que o preço é uma string "X,XX€". 
  // Precisamos convertê-la para número)
  const calcularTotal = () => {
    return cartItems.reduce((total, item) => {
      // Converte "5,00€" para 5.00
      const precoNumerico = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
      return total + (precoNumerico * item.quantity);
    }, 0).toFixed(2); // .toFixed(2) para formatar como "XX.XX"
  };

  // 3. Gerar a Mensagem do WhatsApp e Redirecionar
  const handleFinalizarCompra = () => {
    const numeroWhatsApp = '5532984860949'; 

    let mensagem = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
    
    cartItems.forEach(item => {
      mensagem += `${item.quantity}x ${item.nome} (${item.preco} cada)\n`;
    });

    mensagem += `\n*Total: R$ ${calcularTotal().replace('.', ',')}*`;

    // Codificar a mensagem para uma URL
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Redirecionar para o WhatsApp
    window.location.href = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemCodificada}`;
  };

  // 4. Se o carrinho estiver vazio
  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <h1 className="mt-5">Meu Carrinho</h1>
        <p className="mt-5 mb-5">O seu carrinho está vazio.</p>
        <Link to="/cardapio" className="btn btn-primary">
          Ver Cardápio
        </Link>
      </div>
    );
  }

  // 5. Se o carrinho tiver itens
  return (
    <div className="container mt-5 pt-5">
      <h1 className="mb-4 mt-4">Meu Carrinho</h1>
      
      <ul className="list-group mb-4">
        {cartItems.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            
            {/* Informações do Item (Nome e Preço) */}
            <div>
              <h5 className="mb-0">{item.nome}</h5>
              <small>{item.preco}</small>
            </div>

            {/* Controles de Quantidade */}
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>
              <span className="mx-3">{item.quantity}</span>
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
              
              {/* Botão Remover */}
              <button 
                className="btn btn-danger btn-sm ms-3"
                onClick={() => removeFromCart(item.id)}
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total e Botão de Finalizar */}
      <div className="d-flex justify-content-between align-items-center">
        <h3>Total: <br/>R$ {calcularTotal().replace('.', ',')}</h3>
        
        <button 
          className="btn btn-primary btn-lg"
          onClick={handleFinalizarCompra}
        >
          Finalizar Compra no WhatsApp
        </button>
      </div>
    </div>
  );
}

export default Carrinho;