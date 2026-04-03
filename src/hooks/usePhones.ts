import { useLocation } from 'react-router-dom';

export interface PhoneData {
  contact: string;
  whatsapp: string;
}

// Reinaldo — páginas principais (institucional)
const PHONES_REINALDO: PhoneData = {
  contact: '(71) 98101-9424',
  whatsapp: '5571981019424',
};

// Samuel — páginas de blog (artigos)
const PHONES_SAMUEL: PhoneData = {
  contact: '(71) 98639-3852',
  whatsapp: '5571986393852',
};

/**
 * Hook que retorna os dados de telefone corretos com base na rota atual.
 * - Rotas de artigo de blog (/blog/:id) → Samuel
 * - Todas as outras rotas → Reinaldo
 */
export function usePhones(): PhoneData {
  const { pathname } = useLocation();

  // Verifica se estamos em uma página de artigo de blog individual
  // /blog/:id  →  pathname matches /blog/ followed by something
  const isBlogArticle = /^\/blog\/.+/.test(pathname);

  return isBlogArticle ? PHONES_SAMUEL : PHONES_REINALDO;
}
