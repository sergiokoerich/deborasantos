import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import Logo from '../../assets/images/LogoTerracottaDark.svg'
import LogoClaro from '../../assets/images/LogoCream.svg'
import LinkExterno from '../ui/LinkExterno'
import { NAV_LINKS, PROFISSIONAL, whatsappUrl } from '../../data/contato'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const firstMenuLinkRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = useCallback((restoreFocus) => {
    setIsMobileMenuOpen(false)
    if (restoreFocus) menuButtonRef.current?.focus()
  }, [])

  // Menu do celular: Esc fecha e devolve o foco ao botão; ao abrir, o foco vai para o 1º link.
  useEffect(() => {
    if (!isMobileMenuOpen) return
    firstMenuLinkRef.current?.focus()
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu(true)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen, closeMenu])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-lg py-3'
          : 'on-dark bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between" aria-label="Principal">
          {/* Logo */}
          <motion.a
            href="#inicio"
            onClick={() => closeMenu(false)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <img
              src={isScrolled ? Logo : LogoClaro}
              alt={`${PROFISSIONAL.nome}, início`}
              className="h-12 md:h-14 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`font-body text-[15px]
                           transition-colors duration-300
                           relative after:absolute after:-bottom-1 after:left-0 after:w-0
                           after:h-px after:transition-all after:duration-300
                           hover:after:w-full
                           ${isScrolled
                             ? 'text-espresso hover:text-terracotta-dark after:bg-terracotta-dark'
                             : 'text-cream after:bg-cream'
                           }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>

          {/* CTA Desktop — link de texto editorial */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block"
          >
            <LinkExterno
              href={whatsappUrl()}
              className={`btn-link ${isScrolled ? '' : 'text-cream border-cream/60 hover:text-cream hover:border-cream'}`}
            >
              Agendar avaliação
              <span aria-hidden="true">→</span>
            </LinkExterno>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className={`lg:hidden relative z-10 p-2 ${isScrolled ? 'text-espresso' : 'text-cream'}`}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? (
              <HiX className="w-7 h-7" aria-hidden="true" />
            ) : (
              <HiMenuAlt3 className="w-7 h-7" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            // clip-path em vez de height 'auto': medir a altura faz o framer-motion
            // devolver a página à posição de rolagem anterior e cancela a rolagem até a âncora.
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.3 }}
            className="on-dark lg:hidden absolute top-full left-0 right-0 bg-espresso overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-8" aria-label="Menu do celular">
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      ref={index === 0 ? firstMenuLinkRef : undefined}
                      href={link.href}
                      onClick={() => closeMenu(false)}
                      className="text-cream font-display text-2xl hover:text-blush transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <LinkExterno href={whatsappUrl()} className="btn-primary">
                  Agendar avaliação
                </LinkExterno>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
