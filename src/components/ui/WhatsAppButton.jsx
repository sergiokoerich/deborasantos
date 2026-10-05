import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsappUrl } from '../../data/contato'

function WhatsAppButton() {
  return (
    <aside aria-label="Contato rápido">
      <motion.a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full
                   flex items-center justify-center shadow-lg shadow-[#25D366]/30
                   hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow"
        aria-label="Conversar pelo WhatsApp (abre em nova aba)"
      >
        <FaWhatsapp className="w-8 h-8 text-white" aria-hidden="true" />

        {/* Pulse Animation */}
        <span
          className="absolute w-full h-full rounded-full bg-[#25D366] motion-safe:animate-ping opacity-30"
          aria-hidden="true"
        />
      </motion.a>
    </aside>
  )
}

export default WhatsAppButton
