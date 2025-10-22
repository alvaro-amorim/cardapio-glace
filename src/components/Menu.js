import React, { useState } from 'react';
import menuData from '../data/menu.json';
// 1. Importar o nosso hook
import { useCart } from '../context/CartContext';

function Menu() {
  const [abaAtiva, setAbaAtiva] = useState('brownies');
  
  // 2. Chamar o hook para ter acesso às funções do carrinho
  const { addToCart } = useCart();

  const renderizarProdutos = (produtos) => {
    return (
      <div className="row">
        {produtos.map((produto) => (
          <div key={produto.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100">
              <img 
                src={produto.imagem} 
                className="card-img-top" 
                alt={produto.nome} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text">{produto.descricao}</p>
                <p className="card-text fw-bold">
                  {produto.preco === "Sob consulta" ? produto.preco : `Preço: ${produto.preco}`}
                </p>
                
                {/* 3. O BOTÃO DE ADICIONAR */}
                {/* 'mt-auto' empurra o botão para o fundo do card */}
                {/* Desativamos o botão se o preço for "Sob consulta" */}
                <button 
                  className="btn btn-primary mt-auto"
                  onClick={() => addToCart(produto)}
                  disabled={produto.preco === "Sob consulta"}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center mb-4 mt-5">Nosso Cardápio</h1>

      {/* --- Navegação das Abas (Sem alteração) --- */}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {/* ... (código das abas 'li' - sem alteração) ... */}
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

      {/* --- Conteúdo das Abas (Sem alteração na lógica, só no conteúdo dos cards) --- */}
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
    </div>
  );
}

export default Menu;