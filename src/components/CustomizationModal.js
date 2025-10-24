import React, { useState, useEffect } from 'react';
// 1. Importar os componentes de Modal do react-bootstrap
import { Modal, Button, Form } from 'react-bootstrap';
// 2. Importar o hook do carrinho para adicionar o item no final
import { useCart } from '../context/CartContext';

// 3. Definir as opções e os seus custos
const cortes = ['Bites', 'Pequeno', 'Medio', 'Grande'];
const adicionais = [
  { id: 'casquinha', nome: 'Casquinha de Chocolate', preco: 20.00 },
  { id: 'recheio', nome: 'Recheio de Doce de Leite', preco: 30.00 },
];

function CustomizationModal({ product, show, handleClose }) {
  const { addToCart } = useCart();

  // 4. Estados para controlar a lógica do modal
  const [step, setStep] = useState(1); // 1 = Corte, 2 = Adicionais
  const [selectedCut, setSelectedCut] = useState('');
  const [selectedExtras, setSelectedExtras] = useState([]);

  // 5. Garantir que o modal "reinicia" sempre que um novo produto é selecionado
  useEffect(() => {
    if (show) {
      setStep(1);
      setSelectedCut('');
      setSelectedExtras([]);
    }
  }, [show]);

  // 6. Função para lidar com a seleção dos checkboxes de adicionais
  const handleExtraChange = (extraId) => {
    setSelectedExtras((prevExtras) =>
      prevExtras.includes(extraId)
        ? prevExtras.filter((id) => id !== extraId) // Remove se já estiver selecionado
        : [...prevExtras, extraId] // Adiciona se não estiver
    );
  };

  // 7. A LÓGICA FINAL: Adicionar o item personalizado ao carrinho
  const handleFinalAddToCart = () => {
    if (!product) return;

    // 7a. Calcular o novo preço
    let finalPrice = parseFloat(product.preco.replace('R$', '').replace(',', '.'));
    let extrasDesc = [];

    selectedExtras.forEach((extraId) => {
      const extra = adicionais.find((a) => a.id === extraId);
      if (extra) {
        finalPrice += extra.preco;
        extrasDesc.push(extra.nome);
      }
    });

    // 7b. Criar o novo nome
    let finalName = `${product.nome} (Corte: ${selectedCut})`;
    if (extrasDesc.length > 0) {
      finalName += ` (Adicionais: ${extrasDesc.join(', ')})`;
    }

    // 7c. Formatar o preço final
    const finalPriceString = `R$ ${finalPrice.toFixed(2).replace('.', ',')}`;
    
    // 7d. Criar um ID único para o carrinho (para o carrinho não agrupar itens diferentes)
    const finalId = `${product.id}-${selectedCut}-${selectedExtras.join('-')}`;

    // 7e. Criar o objeto final do produto
    const customizedProduct = {
      ...product, // Mantém a imagem original, etc.
      id: finalId,
      nome: finalName,
      preco: finalPriceString,
    };

    // 7f. Adicionar ao carrinho (usando a função do Contexto)
    addToCart(customizedProduct);
    
    // 7g. Fechar o modal
    handleClose();
  };

  // Não renderiza nada se não houver produto
  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "'Beth Ellen', cursive" }}>
          Como você deseja o Brownie?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* --- PASSO 1: ESCOLHA DO CORTE --- */}
        {step === 1 && (
          <Form>
            <Form.Group>
              <Form.Label as="h5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                1. Escolha o tipo de corte:
              </Form.Label>
              {/* Mapeia as 4 opções de corte */}
              {cortes.map((corte) => (
                <Form.Check
                  type="radio"
                  key={corte}
                  id={`corte-${corte}`}
                  label={corte}
                  name="corteOptions"
                  checked={selectedCut === corte}
                  onChange={() => setSelectedCut(corte)}
                  className="mb-2"
                />
              ))}
            </Form.Group>
          </Form>
        )}

        {/* --- PASSO 2: ESCOLHA DOS ADICIONAIS --- */}
        {step === 2 && (
          <Form>
            <Form.Group>
              <Form.Label as="h5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                2. Deseja algum adicional?
              </Form.Label>
              {/* Mapeia as opções de adicionais */}
              {adicionais.map((extra) => (
                <Form.Check
                  type="checkbox"
                  key={extra.id}
                  id={`extra-${extra.id}`}
                  label={`${extra.nome} (+R$ ${extra.preco.toFixed(2).replace('.', ',')})`}
                  checked={selectedExtras.includes(extra.id)}
                  onChange={() => handleExtraChange(extra.id)}
                  className="mb-2"
                />
              ))}
            </Form.Group>
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        {/* Botão de "Voltar" (só aparece no passo 2) */}
        {step === 2 && (
          <Button variant="outline-secondary" onClick={() => setStep(1)}>
            Voltar
          </Button>
        )}

        {/* Botão "Próximo" (só aparece no passo 1) */}
        {step === 1 && (
          <Button 
            variant="primary" 
            onClick={() => setStep(2)}
            disabled={!selectedCut} // Desativado se nenhum corte for selecionado
          >
            Próximo
          </Button>
        )}

        {/* Botão "Adicionar" (só aparece no passo 2) */}
        {step === 2 && (
          <Button variant="primary" onClick={handleFinalAddToCart}>
            Adicionar ao Carrinho
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CustomizationModal;