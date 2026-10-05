import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { HiArrowDown, HiPause, HiPlay } from 'react-icons/hi'
import espelhoVideo from '../../assets/videos/senhoraespelho-hero.mp4'
import limpezaVideo from '../../assets/videos/limpezadental-hero.mp4'
import heroPoster from '../../assets/videos/hero-poster.webp'
import LinkExterno from '../ui/LinkExterno'
import { ENDERECO, PROFISSIONAL, whatsappUrl } from '../../data/contato'
import { NOTA_GOOGLE } from '../../data/avaliacoes'
import { EASE_OUT } from '../../lib/motion'

// Os vídeos se alternam nesta ordem. O poster é um quadro do primeiro.
const VIDEOS = [espelhoVideo, limpezaVideo]

// O segundo vídeo começa a baixar quando faltam estes segundos para o primeiro acabar.
const ANTECEDENCIA_SEGUNDO = 3

function VideoDeFundo() {
  const reduzirMovimento = useReducedMotion()
  const refs = [useRef(null), useRef(null)]
  const [ativo, setAtivo] = useState(0)
  // null = segue a preferência do sistema; true/false = escolha do visitante no botão.
  const [escolha, setEscolha] = useState(null)
  const [carregarSegundo, setCarregarSegundo] = useState(false)

  const tocando = escolha ?? !reduzirMovimento
  // Com "reduzir movimento" fica só o poster: o vídeo só baixa se o visitante apertar Reproduzir.
  const carregar = [tocando || escolha !== null, carregarSegundo]

  useEffect(() => {
    const video = refs[ativo].current
    if (!video) return
    if (tocando) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [ativo, tocando])

  const aoAvancarPrimeiro = (evento) => {
    const { currentTime, duration } = evento.currentTarget
    if (!carregarSegundo && duration - currentTime < ANTECEDENCIA_SEGUNDO) setCarregarSegundo(true)
  }

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
            src={carregar[i] ? src : undefined}
            poster={i === 0 ? heroPoster : undefined}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={i === 0 ? aoAvancarPrimeiro : undefined}
            onEnded={() => aoTerminar(i)}
            tabIndex={-1}
          />
        ))}
      </div>

      {/* p-3 deixa o alvo de toque com 44 px; a posição compensa o padding. */}
      <button
        type="button"
        onClick={() => setEscolha(!tocando)}
        className="absolute bottom-3 left-3 lg:left-9 z-10 inline-flex items-center gap-2 p-3 text-cream/90 hover:text-cream transition-colors font-body text-sm"
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
      className="on-dark relative min-h-svh flex items-center justify-center overflow-hidden bg-espresso"
    >
      <VideoDeFundo />

      {/* Nome, frase e CRO já nascem visíveis: um fade aqui atrasava o LCP em ~1 s no celular. */}
      <div className="relative container mx-auto px-6 lg:px-12 text-center">
        <h1 className="mb-6">
          <span className="mb-8 flex justify-center">
            <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-cream inline-flex items-center gap-3">
              <span className="w-10 h-px bg-blush" aria-hidden="true" />
              {PROFISSIONAL.profissao} · {PROFISSIONAL.qualificacao}
              <span className="w-10 h-px bg-blush" aria-hidden="true" />
            </span>
          </span>{' '}

          {/* Espaço inseparável entre nome e sobrenome: no celular quebra "Dra. / Débora Santos". */}
          <span
            translate="no"
            className="block font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-cream leading-[1.05]"
            style={{ letterSpacing: '-0.03em' }}
          >
            {PROFISSIONAL.nome.replace(/ (?=\S+$)/, '\u00a0')}
          </span>
        </h1>

        <p className="font-body text-base md:text-lg text-cream max-w-xl mx-auto mb-3 leading-relaxed">
          Planejamento que você vê. Resultado que você sente.
          <span className="block mt-1">Cuidado em cada etapa.</span>
        </p>

        <p translate="no" className="font-body text-xs tracking-[0.3em] uppercase text-cream mb-10">
          {PROFISSIONAL.cro}
        </p>

        {/* Enquanto este bloco estiver na tela, o botão flutuante do WhatsApp fica escondido. */}
        <m.div
          data-oculta-whatsapp
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: EASE_OUT }}
          className="flex flex-col items-center gap-6"
        >
          <LinkExterno href={whatsappUrl()} className="btn-primary">
            Agendar avaliação
          </LinkExterno>
          <p className="font-body text-sm text-cream">
            <span translate="no">{ENDERECO.bairro}, {ENDERECO.cidade}</span> · {NOTA_GOOGLE} no Google
          </p>
        </m.div>

        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
          className="w-[60px] h-px bg-blush mx-auto mt-12"
          aria-hidden="true"
        />
      </div>

      {/* p-2.5 deixa o alvo de toque com 44 px; a posição compensa o padding. */}
      <a
        href="#sobre"
        className="absolute bottom-3.5 left-1/2 -translate-x-1/2 p-2.5 text-cream/80 hover:text-cream transition-colors"
        aria-label="Ir para a seção Sobre"
      >
        <HiArrowDown className="w-6 h-6" aria-hidden="true" />
      </a>
    </section>
  )
}

export default Hero
