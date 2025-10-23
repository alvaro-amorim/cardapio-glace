import React, { createContext, useState, useContext } from 'react';
// 1. Importar o 'toast' e o nosso componente
import { toast } from 'react-toastify';
import ToastContent from '../components/ToastContent';

// 1. Criar o Contexto
const CartContext = createContext();

// 2. Criar o "Provedor" (Provider)
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // 2. DISPARAR A NOTIFICAÇÃO!
    //    Usamos o tipo 'success' (sucesso).
    //    Como o nosso 'btn-primary' é vermelho,
    //    o 'toast.success' (que por defeito é verde)
    //    vai ser sobrescrito pelo nosso CSS do 'btn-primary'
    //    e ficará vermelho, o que é perfeito!
    //    ... ah, espera, o tema é 'colored'. 
    //    Vamos usar toast.info() que é azul 
    //    ou 'toast.dark()' para ser neutro.
    //    ... ou melhor, vamos forçar o nosso estilo!
    
    toast(<ToastContent />, {
      // Usamos a nossa cor vermelha diretamente
      style: { 
        backgroundColor: 'var(--cor-confeitaria-vermelho)' 
      },
      // Posição (opcional, já definimos no Container)
      // position: "bottom-right", 
    });
  };

  // Função para remover um item
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Função para aumentar a quantidade
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Função para diminuir a quantidade
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
          : item
      )
    );
  };

  // 3. O "valor" que o Provedor vai partilhar
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 4. Criar um "Hook" customizado
export function useCart() {
  return useContext(CartContext);
}