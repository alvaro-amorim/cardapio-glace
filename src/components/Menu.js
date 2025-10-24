import React, { useState } from 'react';
import menuData from '../data/menu.json';
import { useCart } from '../context/CartContext';
// 1. Importar o nosso novo Modal
import CustomizationModal from './CustomizationModal';

function Menu() {
  const [abaAtiva, setAbaAtiva] = useState('brownies');
  const { addToCart } = useCart();

  // 2. Estados para controlar o Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 3. Função para lidar com o clique do botão
  const handleAddToCartClick = (produto) => {
    // 3a. Verifica se o ID é de 'brownieNaLata' (l) ou 'tabuleiros' (t)
    const isCustomizable = produto.id.startsWith('l') || produto.id.startsWith('t');

    if (isCustomizable) {
      // 3b. Se for personalizável, ABRE O MODAL
      setSelectedProduct(produto);
      setShowModal(true);
    } else {
      // 3c. Se for um item normal (brownie unitário, etc.), adiciona direto
      addToCart(produto);
    }
  };


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
                style={{ aspectRatio: '1/1', objectFit: 'cover' }} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text">{produto.descricao}</p>
                <p className="card-text fw-bold">
                  {produto.preco === "Esgotado" ? produto.preco : `Preço: ${produto.preco}`}
                </p>
                
                {/* 4. O onClick agora chama a nossa nova função */}
                <button 
                  className="btn btn-primary mt-auto"
                  onClick={() => handleAddToCartClick(produto)}
                  disabled={produto.preco === "Esgotado"}
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
    // 5. Adicionamos 'position-relative' para o Modal funcionar bem
    <div className="container mt-5 pt-5 position-relative">
      <h1 className="text-center mb-4 mt-5">Nosso Cardápio</h1>

      {/* --- Navegação das Abas (Sem alteração) --- */}
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

      {/* --- Conteúdo das Abas (Sem alteração) --- */}
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

      {/* 6. Adicionamos o Modal "invisível" à página */}
      {/* Ele só vai aparecer quando 'showModal' for 'true' */}
      <CustomizationModal
        product={selectedProduct}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default Menu;