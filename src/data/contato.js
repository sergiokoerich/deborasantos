// Fonte única dos dados de identificação e contato do consultório.
// Usado pelos componentes e pelo vite.config.js (meta tags e JSON-LD do index.html).
// Ao mudar telefone, endereço ou horário, mude só aqui.

export const PROFISSIONAL = {
  nome: 'Dra. Débora Santos',
  nomeCurto: 'Débora Santos',
  profissao: 'Cirurgiã-dentista',
  qualificacao: 'Clínica geral',
  cro: 'CRO-SC 23.001',
}

export const TELEFONE = {
  e164: '+5548991979007',
  exibicao: '(48) 99197-9007',
}

export const TELEFONE_URL = `tel:${TELEFONE.e164}`

export const WHATSAPP_MENSAGEM = 'Olá! Gostaria de agendar uma avaliação com a Dra. Débora Santos.'

export function whatsappUrl(mensagem = WHATSAPP_MENSAGEM) {
  return `https://wa.me/${TELEFONE.e164.slice(1)}?text=${encodeURIComponent(mensagem)}`
}

export const ENDERECO = {
  logradouro: 'Rua Dr. Heitor Blum, 310',
  complemento: 'sala 907 (9º andar)',
  edificio: 'Centro Empresarial Vitória Office',
  bairro: 'Estreito',
  cidade: 'Florianópolis',
  uf: 'SC',
  cep: '88075-110',
}

export const ENDERECO_LINHAS = [
  `${ENDERECO.logradouro}, ${ENDERECO.complemento}`,
  ENDERECO.edificio,
  `${ENDERECO.bairro}, ${ENDERECO.cidade}/${ENDERECO.uf} · CEP ${ENDERECO.cep}`,
]

export const ENDERECO_CURTO = [
  `${ENDERECO.logradouro}, sala 907`,
  `${ENDERECO.bairro}, ${ENDERECO.cidade}/${ENDERECO.uf}`,
]

export const HORARIO = [
  { dias: 'Segunda a sexta', horas: '8h às 18h' },
  { dias: 'Sábado', horas: '8h às 13h' },
  { dias: 'Domingo', horas: 'fechado' },
]

// Mesmo horário no formato do schema.org (JSON-LD).
export const HORARIO_SCHEMA = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  { dayOfWeek: ['Saturday'], opens: '08:00', closes: '13:00' },
]

export const INSTAGRAM = {
  usuario: '@dra.deboracsantos',
  url: 'https://www.instagram.com/dra.deboracsantos/',
}

// Perfil da Empresa no Google ("Dra. Débora Santos - Odontologia e Estética").
export const GOOGLE_PLACE_ID = 'ChIJx6OcG2FNJ5UR5KSqtQ2WPJ0'
export const GOOGLE_PERFIL_NOME = 'Dra. Débora Santos - Odontologia e Estética'
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(GOOGLE_PERFIL_NOME)}&query_place_id=${GOOGLE_PLACE_ID}`
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  `${ENDERECO.logradouro} - Sala 907 - ${ENDERECO.bairro}, ${ENDERECO.cidade} - ${ENDERECO.uf}, ${ENDERECO.cep}`,
)}&output=embed`
export const GOOGLE_AVALIACOES_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`
export const GOOGLE_AVALIAR_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`

export const NAV_LINKS = [
  { name: 'Início', href: '#inicio' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Resultados', href: '#resultados' },
  { name: 'Avaliações', href: '#depoimentos' },
  { name: 'Serviços', href: '#servicos' },
  { name: 'Consultório', href: '#clinica' },
]
