import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsappUrl } from '../../data/contato'
import { EASE_OUT } from '../../lib/motion'

// Some enquanto um elemento com `data-oculta-whatsapp` (CTA do topo, rodapé) estiver na tela:
// evita dois botões iguais lado a lado e não cobre o texto do rodapé no celular.
function useOcultoPorAlvos() {
  const [oculto, setOculto] = useState(true)

  useEffect(() => {
    const visiveis = new Set()
    const observer = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) visiveis.add(entrada.target)
        else visiveis.delete(entrada.target)
      }
      setOculto(visiveis.size > 0)
    })
    document.querySelectorAll('[data-oculta-whatsapp]').forEach((alvo) => observer.observe(alvo))
    return () => observer.disconnect()
  }, [])

  return oculto
}

function WhatsAppButton() {
  const oculto = useOcultoPorAlvos()

  return (
    <aside aria-label="Contato rápido">
      <AnimatePresence>
        {!oculto && (
          <m.a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full
                       flex items-center justify-center shadow-md shadow-espresso/25"
            aria-label="Conversar pelo WhatsApp (abre em nova aba)"
          >
            <FaWhatsapp className="w-8 h-8 text-white" aria-hidden="true" />
          </m.a>
        )}
      </AnimatePresence>
    </aside>
  )
}

export default WhatsAppButton
