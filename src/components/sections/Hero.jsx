import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HiArrowDown, HiPause, HiPlay } from 'react-icons/hi'
import espelhoVideo from '../../assets/videos/senhoraespelho-hero.mp4'
import limpezaVideo from '../../assets/videos/limpezadental-hero.mp4'
import heroPoster from '../../assets/videos/hero-poster.webp'
import LinkExterno from '../ui/LinkExterno'
import { PROFISSIONAL, whatsappUrl } from '../../data/contato'

// Os vídeos se alternam nesta ordem. O poster é um quadro do primeiro.
const VIDEOS = [espelhoVideo, limpezaVideo]

function VideoDeFundo() {
  const reduzirMovimento = useReducedMotion()
  const refs = [useRef(null), useRef(null)]
  const [ativo, setAtivo] = useState(0)
  // null = segue a preferência do sistema; true/false = escolha do visitante no botão.
  const [escolha, setEscolha] = useState(null)
  // O segundo vídeo só começa a baixar depois que o primeiro já está tocando.
  const [carregarSegundo, setCarregarSegundo] = useState(false)

  const tocando = escolha ?? !reduzirMovimento

  useEffect(() => {
    const video = refs[ativo].current
    if (!video) return
    if (tocando) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [ativo, tocando])

  const aoTerminar = (indice) => {
    const proximo = (indice + 1) % VIDEOS.length
    const videoProximo = refs[proximo].current
    if (proximo !== indice && videoProximo?.currentSrc) {
      videoProximo.currentTime = 0
      setAtivo(proximo)
    } else {
      refs[indice].current.currentTime = 0
      refs[indice].current.play().catch(() => {})
    }
  }

  return (
    <>
      <div className="absolute inset-0" aria-hidden="true">
        {/* Vídeo a 30%: com 50% o texto creme ficava em ~3:1 nos quadros claros (AA pede 4,5:1). */}
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={refs[i]}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              ativo === i ? 'opacity-30' : 'opacity-0'
            }`}
            src={i === 0 || carregarSegundo ? src : undefined}
            poster={i === 0 ? heroPoster : undefined}
            muted
            playsInline
            preload="auto"
            onPlaying={i === 0 ? () => setCarregarSegundo(true) : undefined}
            onEnded={() => aoTerminar(i)}
            tabIndex={-1}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setEscolha(!tocando)}
        className="absolute bottom-6 left-6 lg:left-12 z-10 inline-flex items-center gap-2 text-cream/90 hover:text-cream transition-colors font-body text-sm"
        aria-label={tocando ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}
      >
        {tocando ? (
          <HiPause className="w-5 h-5" aria-hidden="true" />
        ) : (
          <HiPlay className="w-5 h-5" aria-hidden="true" />
        )}
        <span className="hidden md:inline" aria-hidden="true">
          {tocando ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        </span>
      </button>
    </>
  )
}

function Hero() {
  return (
    <section
      id="inicio"
      className="on-dark relative min-h-screen flex items-center justify-center overflow-hidden bg-espresso"
    >
      <VideoDeFundo />

      <div className="relative container mx-auto px-6 lg:px-12 text-center">
        <h1 className="mb-6">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-cream inline-flex items-center gap-3">
              <span className="w-10 h-px bg-blush" aria-hidden="true" />
              {PROFISSIONAL.profissao} · {PROFISSIONAL.qualificacao}
              <span className="w-10 h-px bg-blush" aria-hidden="true" />
            </span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-cream leading-[1.05]"
            style={{ letterSpacing: '-0.03em' }}
          >
            {PROFISSIONAL.nomeCurto}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-base md:text-lg text-cream max-w-xl mx-auto mb-3 leading-relaxed"
        >
          Planejamento que você vê. Resultado que você sente.
          <span className="block mt-1">Cuidado em cada etapa.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="font-body text-xs tracking-[0.3em] uppercase text-cream mb-10"
        >
          {PROFISSIONAL.cro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center"
        >
          <LinkExterno href={whatsappUrl()} className="btn-primary">
            Agendar avaliação
          </LinkExterno>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="h-px bg-blush mx-auto mt-12"
          aria-hidden="true"
        />
      </div>

      <a
        href="#sobre"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/80 hover:text-cream transition-colors"
        aria-label="Ir para a seção Sobre"
      >
        <HiArrowDown className="w-6 h-6 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}

export default Hero
