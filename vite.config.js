import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seoHeadTags } from './src/data/seo.js'

// Endereço público do site. No go-live com domínio próprio, basta definir
// VITE_SITE_URL (ex.: https://www.exemplo.com.br/) no build; o `base` acompanha.
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://sergiokoerich.github.io/deborasantos/'
const BASE = new URL(SITE_URL).pathname

// Fontes da primeira dobra (nome no topo e texto). Sem preload, o navegador só as descobre
// depois de baixar o CSS. Os nomes têm hash, então saem do bundle (só existe no build).
const FONTES_PRELOAD = [/\/fraunces-latin-opsz-normal-[^/]+\.woff2$/, /\/inter-latin-400-normal-[^/]+\.woff2$/]

function preloadFontes(bundle) {
  if (!bundle) return []
  return Object.keys(bundle)
    .filter((arquivo) => FONTES_PRELOAD.some((padrao) => padrao.test(arquivo)))
    .map((arquivo) => ({
      tag: 'link',
      attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: BASE + arquivo, crossorigin: true },
      injectTo: 'head',
    }))
}

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'seo-head',
      transformIndexHtml: (_html, ctx) => [...seoHeadTags(SITE_URL), ...preloadFontes(ctx.bundle)],
    },
  ],
})
