// Avaliações do Perfil da Empresa no Google, copiadas em 05/10/2026 (texto sem edição).
// Para trocar: escolha a avaliação no Google, copie nome, data e texto, salve a foto
// do avaliador em src/assets/images/avaliacoes/ (96×96 .webp) e ajuste a lista.
// `destaque: true` marca a avaliação exibida em tamanho grande (use só uma).
import guilhermeSantos from '../assets/images/avaliacoes/guilherme-santos.webp'
import gustavoMeneghel from '../assets/images/avaliacoes/gustavo-meneghel.webp'
import maryaEduarda from '../assets/images/avaliacoes/marya-eduarda.webp'
import elianeRamos from '../assets/images/avaliacoes/eliane-ramos.webp'
import odelMarquez from '../assets/images/avaliacoes/odel-marquez.webp'
import lauraMota from '../assets/images/avaliacoes/laura-mota.webp'
import mariaEduardaVelhoDeSouza from '../assets/images/avaliacoes/maria-eduarda-velho-de-souza.webp'

// Nota exibida na seção (fixa; conferir no Google ao atualizar as avaliações).
export const NOTA_GOOGLE = '5,0'

export const AVALIACOES = [
  {
    nome: 'Guilherme Santos',
    foto: guilhermeSantos,
    data: '2026-01-30',
    destaque: true,
    texto:
      'Tive uma ótima experiência com a Dra. Débora. Muito atenciosa e prestativa, explicou tudo com clareza e tirou todas as minhas dúvidas. A clínica é limpa, bem organizada e fica em uma excelente localização, com facilidade para estacionar. Recomendo com certeza.',
  },
  {
    nome: 'Gustavo Meneghel',
    foto: gustavoMeneghel,
    data: '2026-09-05',
    texto: 'Melhor limpeza que fiz na vida! Super simpática e cuidadosa. Voltarei muitas vezes 👏',
  },
  {
    nome: 'Marya Eduarda',
    foto: maryaEduarda,
    data: '2026-05-12',
    texto:
      'Eu não tenho palavras pra descrever o serviço da Dra. Débora.\nExtremamente atenciosa, paciente e querida. Sempre tive medo (pavor) de dentista, e em uma limpeza ela tirou todo o meu trauma.\nProfissional EXCELENTE!!!!! Indico muito muito muito!',
  },
  {
    nome: 'Eliane Ramos',
    foto: elianeRamos,
    data: '2026-04-09',
    texto:
      'Uma ótima profissional, atendimento nota 10,  qualidade e dedicação é o seu diferencial!! Amei fazer meu tratamento com a Dra . Débora',
  },
  {
    nome: 'Odel Marquez',
    foto: odelMarquez,
    data: '2026-04-09',
    texto:
      'Ela é uma Doctora muito profissional, o atendimento dela faz você se sentir em casa. Ela conversa com você, explica cada procedimento em detalhes e sem pressa. Com ela, você não encontra apenas uma Doctora, você encontra um ser humano incrível.',
  },
  {
    nome: 'Laura Mota',
    foto: lauraMota,
    data: '2025-12-19',
    texto:
      'Fui com minha mãe e fomos muito bem atendidas. Ótima profissional, cuidadosa e dedicada. Super recomendo!',
  },
  {
    nome: 'Maria Eduarda Velho de Souza',
    foto: mariaEduardaVelhoDeSouza,
    data: '2024-01-15',
    texto: 'Dra Débora sempre muito atenciosa, me ajudou em uma emergência, recomendo de olhos fechados',
  },
]
