import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import '@fontsource-variable/fraunces/opsz.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* LazyMotion + `m.*` carrega só as animações usadas (sem drag/layout); `strict` acusa um `motion.*` esquecido. */}
    <LazyMotion features={domAnimation} strict>
      {/* Respeita "reduzir movimento" do sistema em todas as animações do framer-motion. */}
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
