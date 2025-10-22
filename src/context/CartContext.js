import React, { createContext, useState, useContext } from 'react';

// 1. Criar o Contexto
const CartContext = createContext();

// 2. Criar o "Provedor" (Provider)
// Este componente vai "embrulhar" a nossa aplicação
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // 1. O item já existe no carrinho?
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // 2. Se sim, aumenta a quantidade
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 3. Se não, adiciona o novo item com quantidade 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Função para remover um item (pode ser útil no futuro)
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Função para aumentar a quantidade (na página do carrinho)
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Função para diminuir a quantidade (na página do carrinho)
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Não deixa ser menor que 1
          : item
      )
    );
  };

  // 3. O "valor" que o Provedor vai partilhar com todos os componentes
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 4. Criar um "Hook" customizado (para facilitar o uso)
// Em vez de importar 'useContext' e 'CartContext' em todo o lado,
// só vamos importar 'useCart()'
export function useCart() {
  return useContext(CartContext);
}