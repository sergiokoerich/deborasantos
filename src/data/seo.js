// Tags de SEO injetadas no <head> do index.html pelo vite.config.js (no dev e no build).
// Ficam no HTML estático para o Google e para as prévias de link (WhatsApp, Instagram)
// funcionarem sem executar JavaScript. Os dados vêm de contato.js.
import {
  PROFISSIONAL,
  TELEFONE,
  ENDERECO,
  HORARIO_SCHEMA,
  INSTAGRAM,
  MAPS_URL,
} from './contato.js'

export const TITULO = `${PROFISSIONAL.nome} | ${PROFISSIONAL.profissao} em ${ENDERECO.cidade}`

export const DESCRICAO =
  `${PROFISSIONAL.profissao} (${PROFISSIONAL.cro}) no ${ENDERECO.bairro}, ${ENDERECO.cidade}. ` +
  'Clínica geral, estética e reabilitação oral. Agende sua avaliação pelo WhatsApp.'

// Imagem provisória de compartilhamento (public/og-image.jpg). Trocar no redesign.
const OG_IMAGEM = { arquivo: 'og-image.jpg', largura: 1200, altura: 630 }

function jsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: PROFISSIONAL.nome,
    url: siteUrl,
    image: new URL(OG_IMAGEM.arquivo, siteUrl).href,
    telephone: TELEFONE.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ENDERECO.logradouro}, sala 907`,
      addressLocality: ENDERECO.cidade,
      addressRegion: ENDERECO.uf,
      postalCode: ENDERECO.cep,
      addressCountry: 'BR',
    },
    openingHoursSpecification: HORARIO_SCHEMA.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      ...h,
    })),
    hasMap: MAPS_URL,
    sameAs: [INSTAGRAM.url, MAPS_URL],
  }
}

export function seoHeadTags(siteUrl) {
  const imagem = new URL(OG_IMAGEM.arquivo, siteUrl).href
  const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
  return [
    { tag: 'title', children: TITULO, injectTo: 'head' },
    meta({ name: 'description', content: DESCRICAO }),
    meta({ property: 'og:type', content: 'website' }),
    meta({ property: 'og:locale', content: 'pt_BR' }),
    meta({ property: 'og:site_name', content: PROFISSIONAL.nome }),
    meta({ property: 'og:title', content: TITULO }),
    meta({ property: 'og:description', content: DESCRICAO }),
    meta({ property: 'og:url', content: siteUrl }),
    meta({ property: 'og:image', content: imagem }),
    meta({ property: 'og:image:width', content: String(OG_IMAGEM.largura) }),
    meta({ property: 'og:image:height', content: String(OG_IMAGEM.altura) }),
    meta({ property: 'og:image:alt', content: `${PROFISSIONAL.nome}, ${PROFISSIONAL.profissao.toLowerCase()} · ${PROFISSIONAL.cro}` }),
    meta({ name: 'twitter:card', content: 'summary_large_image' }),
    meta({ name: 'twitter:title', content: TITULO }),
    meta({ name: 'twitter:description', content: DESCRICAO }),
    meta({ name: 'twitter:image', content: imagem }),
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: JSON.stringify(jsonLd(siteUrl)),
      injectTo: 'head',
    },
  ]
}
