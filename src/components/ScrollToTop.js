import { useEffect } from 'react';
// 1. Importamos o hook 'useLocation' do React Router
import { useLocation } from 'react-router-dom';

// Este componente não renderiza nada (retorna null)
function ScrollToTop() {
  // 2. Usamos o hook para "ouvir" as mudanças de localização (URL)
  const { pathname } = useLocation();

  // 3. Usamos o 'useEffect' para executar uma ação
  //    sempre que o 'pathname' (a URL) mudar.
  useEffect(() => {
    // 4. Esta é a ação: forçar a janela do navegador 
    //    a ir para o topo (posição 0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // A lista de dependências [pathname] é a chave!

  // 5. O componente não precisa de renderizar nada
  return null;
}

export default ScrollToTop;