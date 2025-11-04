/*
 * CÓDIGO FINAL - MENU.JS
 * Lógica de preço simplificada!
 */
import React, { useState, useEffect } from 'react';
import menuData from '../data/menu.json';
import { useCart } from '../context/CartContext';
import CustomizationModal from './CustomizationModal';

// Esta é a sua URL, que está funcionando
const urlApiEstoque = 'https://script.google.com/macros/s/AKfycbwx0zIkE5knHxNNw0TgsfqzKHO-rcVvL9uerXsKhF8GZ21BJoKsMMFDQoNyQ8MCcyDW/exec';

function Menu() {
  const [abaAtiva, setAbaAtiva] = useState('brownies');
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [estoques, setEstoques] = useState(null);

  useEffect(() => {
    async function fetchEstoques() {
      try {
        const response = await fetch(urlApiEstoque);
        if (!response.ok) {
          throw new Error(`Falha na rede: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Dados de estoque recebidos da planilha:', data);
        setEstoques(data);
      } catch (error) {
        console.error('ERRO AO BUSCAR ESTOQUE DA PLANILHA:', error);
        setEstoques({}); 
      }
    }
    
    fetchEstoques();
  }, []);

  const handleAddToCartClick = (produto) => {
    const isCustomizable = produto.id.startsWith('l') || produto.id.startsWith('t');
    if (isCustomizable) {
      setSelectedProduct(produto);
      setShowModal(true);
    } else {
      addToCart(produto);
    }
  };

  const renderizarProdutos = (produtos) => {

    const isUnavailable = (produto) => {
      // Se o preço for "Em breve", está indisponível
      if (produto.preco === "Em breve") return true;
      
      // Se os estoques não carregaram, não está indisponível
      if (estoques === null) return false; 
      
      // Usamos 'produto.id' (ex: "l1") para checar
      const idDaPlanilha = produto.id; 
      
      // Se o produto não é controlado pela planilha (ex: brownie b1), 
      // ele não tem 'id' no objeto 'estoques'. Vamos checar se o ID existe lá.
      if (!estoques.hasOwnProperty(idDaPlanilha)) {
        return false; // Não é controlado pelo estoque, então está disponível
      }

      // É controlado pelo estoque. Checa se o valor é maior que 0.
      const estoqueValor = estoques[idDaPlanilha]; 
      const estaIndisponivel = !(estoqueValor > 0);
      
      return estaIndisponivel;
    };

    const sortedProdutos = [...produtos].sort((a, b) => {
      const aIsUnavailable = isUnavailable(a);
      const bIsUnavailable = isUnavailable(b); 

      if (aIsUnavailable && !bIsUnavailable) return 1;
      if (!aIsUnavailable && bIsUnavailable) return -1;
      return 0;
    });
    
    return (
      <div className="row">
        {sortedProdutos.map((produto) => {
          
          const produtoIndisponivel = isUnavailable(produto);
          const estoqueAtual = (estoques && estoques.hasOwnProperty(produto.id)) ? estoques[produto.id] : null;

          let textoEstoque = null;
          // Mostra o texto só se for controlado pelo estoque e tiver 
          if (estoqueAtual !== null && estoqueAtual > 0) {
            textoEstoque = `Resta(m) ${estoqueAtual} unidade(s)`;
          }

          return (
            <div key={produto.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card h-100">
                <img 
                  src={produto.imagem} 
                  className="card-img-top" 
                  alt={produto.nome} 
                  style={{ aspectRatio: '1/1', objectFit: 'cover' }} 
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{produto.nome}</h5>
                  <p className="card-text">{produto.descricao}</p>
                  
                  {/* --- LÓGICA DE PREÇO SIMPLIFICADA --- */}
                  <p className="card-text fw-bold">
                    {produtoIndisponivel
                      ? (produto.preco === "Em breve" ? "Em breve" : "Esgotado")
                      : `Preço: ${produto.preco}` 
                    }
                  </p>
                  
                  {textoEstoque && (
                    <p className="card-text text-muted" style={{ fontSize: '0.9em', marginTop: '-10px' }}>
                      {textoEstoque}
                    </p>
                  )}
                  
                  <button 
                    className="btn btn-primary mt-auto"
                    onClick={() => handleAddToCartClick(produto)}
                    disabled={produtoIndisponivel}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    // O restante do seu código 'return' (Navegação das Abas, etc.)
    // permanece exatamente o mesmo.
    <div className="container mt-5 pt-5 position-relative">
      <h1 className="text-center mb-4 mt-5">Nosso Cardápio</h1>
      
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${abaAtiva === 'brownies' ? 'active' : ''}`}
            id="brownies-tab" type="button" role="tab"
            onClick={() => setAbaAtiva('brownies')}
          >
            Brownies Unitários
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${abaAtiva === 'lata' ? 'active' : ''}`}
            id="lata-tab" type="button" role="tab"
            onClick={() => setAbaAtiva('lata')}
          >
            Brownie na Lata
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${abaAtiva === 'tabuleiros' ? 'active' : ''}`}
            id="tabuleiros-tab" type="button" role="tab"
            onClick={() => setAbaAtiva('tabuleiros')}
          >
            Tabuleiros
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${abaAtiva === 'bolos' ? 'active' : ''}`}
            id="bolos-tab" type="button" role="tab"
            onClick={() => setAbaAtiva('bolos')}
          >
            Bolos e Tortas
          </button>
        </li>
      </ul>
      
      <div className="tab-content" id="myTabContent">
        <div 
          className={`tab-pane fade p-3 ${abaAtiva === 'brownies' ? 'show active' : ''}`} 
          id="brownies" role="tabpanel"
        >
          <h3>Brownies Unitários</h3>
          {renderizarProdutos(menuData.browniesUnitarios)}
        </div>
        <div 
          className={`tab-pane fade p-3 ${abaAtiva === 'lata' ? 'show active' : ''}`} 
          id="lata" role="tabpanel"
        >
          <h3>Brownie na Lata</h3>
          {renderizarProdutos(menuData.brownieNaLata)}
        </div>
        <div 
          className={`tab-pane fade p-3 ${abaAtiva === 'tabuleiros' ? 'show active' : ''}`} 
          id="tabuleiros" role="tabpanel"
        >
          <h3>Tabuleiros</h3>
          {renderizarProdutos(menuData.tabuleiros)}
        </div>
        <div 
          className={`tab-pane fade p-3 ${abaAtiva === 'bolos' ? 'show active' : ''}`} 
          id="bolos" role="tabpanel"
        >
          <h3>Bolos e Tortas</h3>
          {renderizarProdutos(menuData.bolosETortas)}
        </div>
      </div>
      
      <CustomizationModal
        product={selectedProduct}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default Menu;