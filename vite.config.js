import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seoHeadTags } from './src/data/seo.js'

// Endereço público do site. No go-live com domínio próprio, basta definir
// VITE_SITE_URL (ex.: https://www.exemplo.com.br/) no build; o `base` acompanha.
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://sergiokoerich.github.io/deborasantos/'

export default defineConfig({
  base: new URL(SITE_URL).pathname,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'seo-head',
      transformIndexHtml: () => seoHeadTags(SITE_URL),
    },
  ],
})
